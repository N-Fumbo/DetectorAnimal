using DetectorAnimal.Domain.Base.Entities.Base;

namespace DetectorAnimal.Domain.Base.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        Task<bool> Exist(T item, CancellationToken cancel = default);

        Task<bool> ExistById(int id, CancellationToken cancel = default);

        Task<IEnumerable<T>> Get(int skip, int count, CancellationToken cancel = default);

        Task<T> GetById(int id, CancellationToken cancel = default);

        Task<int> GetCount(CancellationToken cancel = default);

        Task<T> Add(T item, CancellationToken cancel = default);

        Task<T> Update(T item, CancellationToken cancel = default);

        Task<T> Delete(T item, CancellationToken cancel = default);

        Task<T> DeleteById(int id, CancellationToken cancel = default);
    }
}