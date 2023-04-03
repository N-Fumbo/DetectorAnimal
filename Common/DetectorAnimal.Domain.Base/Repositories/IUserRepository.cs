using DetectorAnimal.Domain.Base.Entities;
using DetectorAnimal.Domain.Base.Repositories.Base;

namespace DetectorAnimal.Domain.Base.Repositories
{
    public interface IUserRepository<T> : IRepository<T> where T : IUser, new()
    {
        Task<bool> ExistEmail(string email, CancellationToken cancel = default);

        Task<T> GetByEmail(string email, CancellationToken cancel = default);

        Task<T> DeleteByEmail(string email, CancellationToken cancel = default);
    }
}