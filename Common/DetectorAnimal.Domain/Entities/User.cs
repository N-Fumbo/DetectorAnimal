using DetectorAnimal.Domain.Entities.Base;

namespace DetectorAnimal.Domain.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public bool IsEmailConfirmed { get; set; }
    }
}