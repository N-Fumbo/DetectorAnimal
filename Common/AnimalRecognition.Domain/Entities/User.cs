using AnimalRecognition.Domain.Base.Entities;
using AnimalRecognition.Domain.Entities.Base;

namespace AnimalRecognition.Domain.Entities
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