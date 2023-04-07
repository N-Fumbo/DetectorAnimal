using DetectorAnimal.Domain.Base.Entities.Base;
using System.Linq.Expressions;

namespace DetectorAnimal.Domain.Base.Repositories.Base
{
    public interface IRepository<T> where T : IEntity
    {
        Task<int> SaveChanges(CancellationToken cancel = default);

        Task ExecuteInTransaction(Func<Task> func, CancellationToken cancel = default);

        Task<TResult> ExecuteInTransaction<TResult>(Func<Task<TResult>> func, CancellationToken cancel = default);

        Task<bool> Exist(T item, CancellationToken cancel = default);

        Task<bool> ExistId(int id, CancellationToken cancel = default);

        Task<T> GetById(int id, CancellationToken cancel = default);

        Task<T> GetById(int id, Expression<Func<T, object>>[] includeProperties, CancellationToken cancel = default);

        Task<IEnumerable<T>> Get(int skip, int count, CancellationToken cancel = default);

        Task<IEnumerable<T>> Get(int skip, int count, Expression<Func<T, object>>[] includeProperties, CancellationToken cancel = default);

        Task<int> GetCount(CancellationToken cancel = default);

        Task<T> Add(T item, bool isSaveChanges = false, CancellationToken cancel = default);

        Task<T> Update(T item, bool isSaveChanges = false, CancellationToken cancel = default);

        Task<T> Delete(T item, bool isSaveChanges = false, CancellationToken cancel = default);

        Task<T> DeleteById(int id, bool isSaveChanges = false, CancellationToken cancel = default);
    }
}