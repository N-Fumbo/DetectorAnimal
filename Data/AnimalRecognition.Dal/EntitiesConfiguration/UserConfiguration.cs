using AnimalRecognition.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRecognition.Dal.EntitiesConfiguration
{
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("id");

            builder.Property(x => x.Name)
                .HasColumnName("name")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.Email)
                .HasColumnName("email")
                .HasMaxLength(256)
                .IsRequired();

            builder.HasIndex(x => x.Email)
                .IsUnique();

            builder.Property(x => x.PasswordHash)
                .HasColumnName("password_hash")
                .IsRequired();

            builder.Property(x => x.IdEmailConfirmation)
                .HasColumnName("id_email_confirmation")
                .IsRequired();

            builder.HasOne(x => x.EmailConfirmation)
                .WithOne(x => x.User)
                .HasForeignKey<User>(x => x.IdEmailConfirmation);
        }
    }
}