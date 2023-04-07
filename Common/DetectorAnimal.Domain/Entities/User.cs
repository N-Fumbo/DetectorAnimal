using DetectorAnimal.Domain.Base.Entities;
using DetectorAnimal.Domain.Entities.Base;

namespace DetectorAnimal.Domain.Entities
{
    public class User : Entity, IUser
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public int IdEmailConfirmation { get; set; }

        public EmailConfirmation EmailConfirmation { get; set; }
    }
}