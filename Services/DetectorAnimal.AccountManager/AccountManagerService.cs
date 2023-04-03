using DetectorAnimal.AccountManager.Heplers;
using DetectorAnimal.Dal.Repositories;
using DetectorAnimal.Domain.AccountManager;
using DetectorAnimal.Domain.Entities;

namespace DetectorAnimal.AccountManager
{
    public class AccountManagerService
    {
        private readonly UserRepository<User> _userRepository;

        public AccountManagerService(UserRepository<User> userRepository)
        {
            if (userRepository is null) throw new ArgumentNullException(nameof(userRepository));

            _userRepository = userRepository;
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

            User addedUser = await _userRepository.Add(user);
            if(addedUser != null)
            {
                result.StatusCode = StatusCodeAccount.OK;
                result.Data = addedUser;
                return result;
            }

            result.StatusCode = StatusCodeAccount.Failed;
            return result;
        }
    }
}