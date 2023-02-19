using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Web.Models
{
    public class RegisterViewModel
    {
        [Required]
        [MaxLength(50)]
        [Display(Name = nameof(FirstName))]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        [Display(Name = nameof(LastName))]
        public string LastName { get; set; }
        
        [Required]
        [MinLength(4)]
        [MaxLength(12)]
        [Display(Name = nameof(UserName))]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = nameof(Email))]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string PasswordConfirmed { get; set; }
    }
}