using DetectorAnimal.Dal.Context;
using DetectorAnimal.Domain.Base.Repositories;
using DetectorAnimal.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace DetectorAnimal.Dal.Repositories
{
    public class DbRepository<T> : IRepository<T> where T : Entity, new()
    {
        private readonly AppDbContext _context;

        protected DbSet<T> Set { get; }

        protected virtual IQueryable<T> Items => Set;

        public DbRepository(AppDbContext context)
        {
            _context = context;
            Set = _context.Set<T>();
        }

        public async Task<bool> Exist(T item, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            return await Items.AnyAsync(x => x.Id == item.Id, cancel).ConfigureAwait(false);
        }

        public async Task<bool> ExistId(int id, CancellationToken cancel = default) => 
            await Items.AnyAsync(item => item.Id == id, cancel).ConfigureAwait(false);

        public async Task<IEnumerable<T>> Get(int skip, int count, CancellationToken cancel = default)
        {
            if (count <= 0) return Enumerable.Empty<T>();

            var query = skip > 0 ? Items.Skip(skip) : Items;

            return await query.Take(count).ToArrayAsync(cancel).ConfigureAwait(false);
        }

        public async Task<T> GetById(int id, CancellationToken cancel = default)
        {
            return Items switch
            {
                DbSet<T> set => await set.FindAsync(new object[] { id }, cancel).ConfigureAwait(false),
                { } items => await Items.FirstOrDefaultAsync(item => item.Id == id, cancel).ConfigureAwait(false),
                _ => throw new InvalidOperationException("Ошибка в определении источника данных."),
            };
        }

        public async Task<int> GetCount(CancellationToken cancel = default) => 
            await Items.CountAsync(cancel).ConfigureAwait(false);

        public async Task<T> Add(T item, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            await _context.AddAsync(item, cancel).ConfigureAwait(false);

            await _context.SaveChangesAsync(cancel).ConfigureAwait(false);

            return item;
        }

        public async Task<T> Update(T item, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            _context.Update(item);

            await _context.SaveChangesAsync(cancel).ConfigureAwait(false);

            return item;
        }

        public async Task<T> Delete(T item, CancellationToken cancel = default)
        {
            if (item is null) throw new ArgumentNullException(nameof(item));

            if (!await ExistId(item.Id, cancel))
                return null;

            _context.Remove(item);

            await _context.SaveChangesAsync(cancel).ConfigureAwait(false);

            return item;
        }

        public async Task<T> DeleteById(int id, CancellationToken cancel = default)
        {
            var item = Set.Local.FirstOrDefault(x => x.Id == id);

            item ??= await Set
                    .Select(x => new T { Id = x.Id })
                    .FirstOrDefaultAsync(x => x.Id == id, cancel)
                    .ConfigureAwait(false);

            if (item is null) return null;

            return await Delete(item, cancel).ConfigureAwait(false);
        }
    }
}