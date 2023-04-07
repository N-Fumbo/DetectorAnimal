using DetectorAnimal.Domain.Entities.Base;

namespace DetectorAnimal.Domain.Entities
{
    public class EmailConfirmation : Entity
    {
        public User User { get; set; }

        public string EmailConfirmationToken { get; set; }

        public bool IsEmailConfirmed { get; set; }
    }
}