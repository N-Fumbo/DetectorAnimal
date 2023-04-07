using DetectorAnimal.Dal.Context;
using DetectorAnimal.Dal.Repositories.Base;
using DetectorAnimal.Domain.Base.Repositories;
using DetectorAnimal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DetectorAnimal.Dal.Repositories
{
    public class UserRepository<T> : DbRepository<T>, IUserRepository<T> where T : User, new()
    {
        public UserRepository(AppDbContext context) : base(context) { }

        public async Task<bool> ExistEmail(string email, CancellationToken cancel = default)
        {
            if (email is null) throw new ArgumentNullException(nameof(email));

            return await _set.AnyAsync(x => x.Email == email, cancel).ConfigureAwait(false);
        }

        public async Task<T> GetByEmail(string email, CancellationToken cancel = default)
        {
            if (email is null) throw new ArgumentNullException(nameof(email));

            return await _set.FirstOrDefaultAsync(x => x.Email == email, cancel).ConfigureAwait(false);
        }

        public async Task<T> GetByEmail(string email, Expression<Func<T, object>>[] includeProperties, CancellationToken cancel = default)
        {
            IQueryable<T> query = _set;
            foreach (var property in includeProperties)
                query = query.Include(property);

            return await query.FirstAsync(x => x.Email == email, cancel).ConfigureAwait(false);
        }

        public async Task<T> DeleteByEmail(string email, bool isSaveChanges = false, CancellationToken cancel = default)
        {
            if (email is null) throw new ArgumentNullException(nameof(email));

            var item = _set.Local.FirstOrDefault(x => x.Email == email);

            item ??= await _set
                    .Select(x => new T { Id = x.Id, Email = x.Email })
                    .FirstOrDefaultAsync(x => x.Email == email, cancel)
                    .ConfigureAwait(false);

            if (item is null) return null;

            return await Delete(item, isSaveChanges, cancel).ConfigureAwait(false);
        }
    }
}