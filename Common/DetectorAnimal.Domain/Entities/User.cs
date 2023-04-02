using DetectorAnimal.Domain.Entities.Base;

namespace DetectorAnimal.Domain.Entities
{
    public class User : NamedEntity
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public bool IsVerified { get; set; }
    }
}