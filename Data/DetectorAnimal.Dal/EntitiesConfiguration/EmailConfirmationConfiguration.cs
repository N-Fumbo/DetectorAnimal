using DetectorAnimal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DetectorAnimal.Dal.EntitiesConfiguration
{
    internal class EmailConfirmationConfiguration : IEntityTypeConfiguration<EmailConfirmation>
    {
        public void Configure(EntityTypeBuilder<EmailConfirmation> builder)
        {
            builder.ToTable("email_confirmations");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("id");

            builder.Property(x => x.EmailConfirmationToken)
                .HasColumnName("email_confirmation_token")
                .IsRequired();

            builder.Property(x => x.IsEmailConfirmed)
                .HasColumnName("is_email_confirmed")
                .HasDefaultValue(false)
                .IsRequired();
        }
    }
}