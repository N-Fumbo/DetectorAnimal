using DetectorAnimal.Dal.Context;
using DetectorAnimal.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DetectorAnimal.Dal.Repositories
{
    public class UserRepository : DbRepository<User>
    {
        public UserRepository(AppDbContext context) : base(context) { }

        public async Task<bool> ExistEmail(string email, CancellationToken cancel)
        {
            if (email is null) throw new ArgumentNullException(nameof(email));

            return await Items.AnyAsync(x => x.Email == email, cancel).ConfigureAwait(false);
        }

        public async Task<User> GetByEmail(string email, CancellationToken cancel)
        {
            if(email is null) throw new ArgumentNullException(nameof(email));

            return await Items.FirstOrDefaultAsync(x => x.Email == email, cancel).ConfigureAwait(false);
        }

        public async Task<User> DeleteByEmail(string email, CancellationToken cancel)
        {
            if (email is null) throw new ArgumentNullException(nameof(email));

            var item = Set.Local.FirstOrDefault(x => x.Email == email);

            item ??= await Set
                    .Select(x => new User { Id = x.Id, Email = x.Email })
                    .FirstOrDefaultAsync(x => x.Email == email, cancel)
                    .ConfigureAwait(false);

            if (item is null) return null;

            return await Delete(item, cancel).ConfigureAwait(false);
        }
    }
}