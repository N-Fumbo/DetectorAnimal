using DetectorAnimal.Dal.Context;
using DetectorAnimal.Domain.Base.Repositories.Base;
using DetectorAnimal.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DetectorAnimal.Dal.Repositories.Base
{
    public class DbRepository<T> : IRepository<T> where T : Entity, new()
    {
        private readonly AppDbContext _context;

        protected DbSet<T> _set { get; }

        public DbRepository(AppDbContext context)
        {
            _context = context;
            _set = _context.Set<T>();
        }

        public async Task<int> SaveChanges(CancellationToken cancel = default) => 
            await _context.SaveChangesAsync(cancel).ConfigureAwait(false);

        public async Task ExecuteInTransaction(Func<Task> func, CancellationToken cancel = default)
        {
            using var transaction = await _context.Database.BeginTransactionAsync(cancel).ConfigureAwait(false);
            try
            {
                await func().ConfigureAwait(false);

                await SaveChanges(cancel);

                await transaction.CommitAsync(cancel).ConfigureAwait(false);
            }
            catch(Exception)
            {
                await transaction.RollbackAsync(cancel).ConfigureAwait(false);
                throw;
            }
        }

        public async Task<TResult> ExecuteInTransaction<TResult>(Func<Task<TResult>> func, CancellationToken cancel = default)
        {
            using var transaction = await _context.Database.BeginTransactionAsync(cancel).ConfigureAwait(false);
            try
            {
                var result = await func().ConfigureAwait(false);

                await SaveChanges(cancel);

                await transaction.CommitAsync(cancel).ConfigureAwait(false);

                return result;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync(cancel).ConfigureAwait(false);
                throw;
            }
        }

        public async Task<bool> Exist(T item, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            return await _set.AnyAsync(x => x.Id == item.Id, cancel).ConfigureAwait(false);
        }

        public async Task<bool> ExistId(int id, CancellationToken cancel = default) =>
            await _set.AnyAsync(item => item.Id == id, cancel).ConfigureAwait(false);

        public async Task<T> GetById(int id, CancellationToken cancel = default) => 
            await _set.FindAsync(new object[] { id }, cancel).ConfigureAwait(false);

        public async Task<T> GetById(int id, Expression<Func<T, object>>[] includeProperties, CancellationToken cancel = default)
        {
            IQueryable<T> query = _set;
            foreach (var property in includeProperties)
                query = query.Include(property);

            return await query.FirstAsync(x => x.Id == id, cancel).ConfigureAwait(false);
        }

        public async Task<IEnumerable<T>> Get(int skip, int count, CancellationToken cancel = default)
        {
            if (count <= 0) return Enumerable.Empty<T>();

            var query = skip > 0 ? _set.Skip(skip) : _set;

            return await query.Take(count).ToArrayAsync(cancel).ConfigureAwait(false);
        }

        public async Task<IEnumerable<T>> Get(int skip, int count, Expression<Func<T, object>>[] includeProperties, CancellationToken cancel = default)
        {
            if (count <= 0) return Enumerable.Empty<T>();

            var query = skip > 0 ? _set.Skip(skip) : _set;

            foreach (var property in includeProperties)
                query = query.Include(property);

            return await query.Take(count).ToArrayAsync(cancel).ConfigureAwait(false);
        }

        public async Task<int> GetCount(CancellationToken cancel = default) =>
            await _set.CountAsync(cancel).ConfigureAwait(false);

        public async Task<T> Add(T item, bool isSaveChanges = false, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            await _context.AddAsync(item, cancel).ConfigureAwait(false);

            if(isSaveChanges) await SaveChanges(cancel).ConfigureAwait(false);

            return item;
        }

        public async Task<T> Update(T item, bool isSaveChanges = false, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            _context.Update(item);

            if (isSaveChanges) await SaveChanges(cancel).ConfigureAwait(false);

            return item;
        }

        public async Task<T> Delete(T item, bool isSaveChanges = false, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            if (!await ExistId(item.Id, cancel))
                return null;

            _context.Remove(item);

            if (isSaveChanges) await SaveChanges(cancel).ConfigureAwait(false);

            return item;
        }

        public async Task<T> DeleteById(int id, bool isSaveChanges = false, CancellationToken cancel = default)
        {
            var item = _set.Local.FirstOrDefault(x => x.Id == id);

            item ??= await _set
                    .Select(x => new T { Id = x.Id })
                    .FirstOrDefaultAsync(x => x.Id == id, cancel)
                    .ConfigureAwait(false);

            if (item is null) return null;

            return await Delete(item, isSaveChanges, cancel).ConfigureAwait(false);
        }

    }
}