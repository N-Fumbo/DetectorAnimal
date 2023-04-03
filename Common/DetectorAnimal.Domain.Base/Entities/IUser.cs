﻿using DetectorAnimal.Domain.Base.Entities.Base;

namespace DetectorAnimal.Domain.Base.Entities
{
    public interface IUser : IEntity
    {
        string Name { get; set; }

        string Email { get; set; }

        string PasswordHash { get; set; }

        public bool IsEmailConfirmed { get; set; }
    }
}
