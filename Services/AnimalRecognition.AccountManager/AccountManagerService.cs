using AnimalRecognition.AccountManager.Heplers;
using AnimalRecognition.Dal.Repositories;
using AnimalRecognition.Domain.AccountManager;
using AnimalRecognition.Domain.Entities;
using AnimalRecognition.MailService;
using Mustache;
using System.Linq.Expressions;

namespace AnimalRecognition.AccountManager
{
    public class AccountManagerService
    {
        private static readonly string _confirmationEmailTemplate = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Html/ConfirmationEmailTemplate.html"));

        private readonly UserRepository<User> _userRepository;

        private readonly EmailService _emailService;

        public AccountManagerService(UserRepository<User> userRepository, EmailService emailService)
        {
            if (userRepository is null) throw new ArgumentNullException(nameof(userRepository));

            if (emailService is null) throw new ArgumentNullException(nameof(emailService));

            _userRepository = userRepository;
            _emailService = emailService;
        }

        public async Task<ResultAccountManager<User>> Register(User user, CancellationToken cancel = default)
        {
            if (user is null) throw new ArgumentNullException(nameof(user));

            var result = new ResultAccountManager<User>();

            if (await _userRepository.ExistEmail(user.Email, cancel).ConfigureAwait(false))
            {
                result.StatusCode = StatusCodeAccount.EmailAlreadyRegistered;
                return result;
            }

            user.PasswordHash = HashPasswordHelper.HasPassword(user.PasswordHash);

            EmailConfirmation emailConfirmation = new()
            {
                EmailConfirmationToken = Guid.NewGuid().ToString(),
                IsEmailConfirmed = false,
                User = user
            };

            user.EmailConfirmation = emailConfirmation;

            async Task<User> createAccount()
            {
                User addedUser = await _userRepository.Add(user, isSaveChanges: true, cancel: cancel).ConfigureAwait(false);
                if (addedUser is null) throw new InvalidOperationException(nameof(addedUser));

                string urlVerificationEmail = $"https://localhost:7271/Account/ConfirmEmail/{addedUser.Id}/{addedUser.EmailConfirmation.EmailConfirmationToken}";

                var data = new { urlVerificationEmail };
                var generator = new FormatCompiler();
                var parsedTemplate = generator.Compile(_confirmationEmailTemplate);
                var resultTemplate = parsedTemplate.Render(data);

                await _emailService.SendMessageAsync(addedUser.Email, "Animal Recognition", "recognition@animal.com", "Confirm your mail", resultTemplate, cancel).ConfigureAwait(false);

                return addedUser;
            }

            User addedUser = await _userRepository.ExecuteInTransaction(createAccount, cancel).ConfigureAwait(false);

            result.StatusCode = StatusCodeAccount.OK;
            result.Data = addedUser;
            return result;
        }

        public async Task<ResultAccountManager<User>> LogIn(User user, CancellationToken cancel = default)
        {
            if (user is null) throw new ArgumentNullException(nameof(user));

            var result = new ResultAccountManager<User>();

            if (await _userRepository.ExistEmail(user.Email, cancel).ConfigureAwait(false) is false)
            {
                result.StatusCode = StatusCodeAccount.InvalidUserData;
                return result;
            }

            User dbUser = await _userRepository.GetByEmail(user.Email, includeProperties: new Expression<Func<User, object>>[] { x => x.EmailConfirmation }, cancel: cancel).ConfigureAwait(false) ??
                throw new Exception($"User is not found: {user.Email}");

            if (HashPasswordHelper.Verify(user.PasswordHash, dbUser.PasswordHash) is false)
            {
                result.StatusCode = StatusCodeAccount.InvalidUserData;
                return result;
            }

            if (!dbUser.EmailConfirmation.IsEmailConfirmed)
            {
                result.StatusCode = StatusCodeAccount.UserNotVerified;
                return result;
            }

            result.StatusCode = StatusCodeAccount.OK;
            result.Data = dbUser;

            return result;
        }

        public async Task<ResultAccountManager<User>> ConfirmEmail(int id, string token, CancellationToken cancel = default)
        {
            if (token is null || !Guid.TryParse(token, out var _)) throw new ArithmeticException(nameof(token));

            ResultAccountManager<User> result = new();

            if (await _userRepository.ExistId(id, cancel).ConfigureAwait(false))
            {
                User user = await _userRepository.GetById(id, includeProperties: new Expression<Func<User, object>>[] { x => x.EmailConfirmation }, cancel: cancel).ConfigureAwait(false);
                if (user?.EmailConfirmation?.IsEmailConfirmed == false)
                {
                    if (user.EmailConfirmation.EmailConfirmationToken == token)
                        user.EmailConfirmation.IsEmailConfirmed = true;

                    User updateUser = await _userRepository.Update(user, true, cancel).ConfigureAwait(false);
                    if (updateUser != null)
                    {
                        result.StatusCode = StatusCodeAccount.OK;
                        result.Data = updateUser;
                        return result;
                    }
                }
            }

            result.StatusCode = StatusCodeAccount.Failed;

            return result;
        }

    }
}