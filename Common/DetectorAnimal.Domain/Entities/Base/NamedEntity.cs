using DetectorAnimal.Domain.Base.Entities.Base;

namespace DetectorAnimal.Domain.Entities.Base
{
    public abstract class NamedEntity : Entity, INamedEntity
    {
        public string Name { get; set; }
    }
}