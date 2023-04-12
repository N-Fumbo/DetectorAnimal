using AnimalRecognition.Domain.Base.Entities;
using AnimalRecognition.Domain.Base.Repositories.Base;
using System.Linq.Expressions;

namespace AnimalRecognition.Domain.Base.Repositories
{
    public interface IUserRepository<T> : IRepository<T> where T : IUser, new()
    {
        Task<bool> ExistEmail(string email, CancellationToken cancel = default);

        Task<T> GetByEmail(string email, CancellationToken cancel = default);

        Task<T> GetByEmail(string email, Expression<Func<T, object>>[] includeProperties, CancellationToken cancel = default);

        Task<T> DeleteByEmail(string email, bool isSaveChanges = false, CancellationToken cancel = default);
    }
}