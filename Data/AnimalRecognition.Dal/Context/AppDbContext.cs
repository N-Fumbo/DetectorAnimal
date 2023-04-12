using AnimalRecognition.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace AnimalRecognition.Dal.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<EmailConfirmation> EmailConfirmations { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) => modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}