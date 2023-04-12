using AnimalRecognition.Domain.Base.Entities.Base;

namespace AnimalRecognition.Domain.Base.Entities
{
    public interface IUser : IEntity
    {
        string Name { get; set; }

        string Email { get; set; }

        string PasswordHash { get; set; }
    }
}
