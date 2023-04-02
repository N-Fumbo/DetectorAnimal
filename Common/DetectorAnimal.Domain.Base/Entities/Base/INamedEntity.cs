using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Domain.Base.Entities.Base
{
    public interface INamedEntity : IEntity
    {
        [Required]
        string Name { get; }
    }
}