using DetectorAnimal.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DetectorAnimal.Dal.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}