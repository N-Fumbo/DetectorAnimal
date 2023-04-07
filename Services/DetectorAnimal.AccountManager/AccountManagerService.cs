using DetectorAnimal.AccountManager.Heplers;
using DetectorAnimal.Dal.Repositories;
using DetectorAnimal.Domain.AccountManager;
using DetectorAnimal.Domain.Entities;
using DetectorAnimal.MailService;
using System.Linq.Expressions;

namespace DetectorAnimal.AccountManager
{
    public class AccountManagerService
    {
        private readonly UserRepository<User> _userRepository;

        private readonly EmailService _emailService;

        public AccountManagerService(UserRepository<User> userRepository, EmailService emailService)
        {
            if (userRepository is null) throw new ArgumentNullException(nameof(userRepository));

            if (emailService is null) throw new ArgumentNullException(nameof(emailService));

            _userRepository = userRepository;
            _emailService = emailService;
        }

        public async Task<ResultAccountManager<User>> Register(User user)
        {
            if (user is null) throw new ArgumentNullException(nameof(user));

            var result = new ResultAccountManager<User>();

            if (await _userRepository.ExistEmail(user.Email))
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
                User addedUser = await _userRepository.Add(user, isSaveChanges: true);
                if (addedUser is null) throw new InvalidOperationException(nameof(addedUser));

                string urlVerificationEmail = $"https://localhost:7271/Account/ConfirmEmail/{addedUser.Id}/{addedUser.EmailConfirmation.EmailConfirmationToken}";

                await _emailService.SendMessageAsync(addedUser.Email, "DetectorAnimal", "detect@animal.com", "Подтвердите свой почту",
                    $"<p>Ваш код подтверждение email адреса:</p><a href='{urlVerificationEmail}'>Подтвердить</a>");

                return addedUser;
            }

            User addedUser = await _userRepository.ExecuteInTransaction(createAccount);

            result.StatusCode = StatusCodeAccount.OK;
            result.Data = addedUser;
            return result;
        }

        public async Task<ResultAccountManager<User>> LogIn(User user)
        {
            if (user is null) throw new ArgumentNullException(nameof(user));

            var result = new ResultAccountManager<User>();

            User dbUser = await _userRepository.GetByEmail(user.Email, includeProperties: new Expression<Func<User, object>>[] { x => x.EmailConfirmation });
            if (dbUser is null)
            {
                result.StatusCode = StatusCodeAccount.InvalidUserData;
                return result;
            }

            user.PasswordHash = HashPasswordHelper.HasPassword(user.PasswordHash);

            if (user.PasswordHash != dbUser.PasswordHash)
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

        public async Task<ResultAccountManager<User>> ConfirmEmail(int id, string token)
        {
            if(token is null || !Guid.TryParse(token, out var _)) throw new ArithmeticException(nameof(token));

            ResultAccountManager<User> result = new();

            User user = await _userRepository.GetById(id, includeProperties: new Expression<Func<User, object>>[] { x => x.EmailConfirmation });
            if(user != null)
            {
                if (user.EmailConfirmation.EmailConfirmationToken == token)
                    user.EmailConfirmation.IsEmailConfirmed = true;

                User updateUser = await _userRepository.Update(user, true);
                if(updateUser != null)
                {
                    result.StatusCode = StatusCodeAccount.OK;
                    result.Data = updateUser;
                    return result;
                }
            }

            result.StatusCode = StatusCodeAccount.Failed;

            return result;
        }
    }
}