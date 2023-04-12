using AnimalRecognition.Domain.Base.Entities.Base;

namespace AnimalRecognition.Domain.Entities.Base
{
    public abstract class Entity : IEntity
    {
        public int Id { get; set; }
    }
}