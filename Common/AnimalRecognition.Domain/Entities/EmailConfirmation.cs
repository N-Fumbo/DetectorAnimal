using AnimalRecognition.Domain.Entities.Base;

namespace AnimalRecognition.Domain.Entities
{
    public class EmailConfirmation : Entity
    {
        public User User { get; set; }

        public string EmailConfirmationToken { get; set; }

        public bool IsEmailConfirmed { get; set; }
    }
}