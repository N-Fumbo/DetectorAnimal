using DetectorAnimal.Domain.Base.Entities.Base;

namespace DetectorAnimal.Domain.Entities.Base
{
    public abstract class Entity : IEntity
    {
        public int Id { get; set; }
    }
}