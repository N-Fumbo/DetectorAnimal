using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Web.Models
{
    public class LoginViewModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(12)]
        [Display(Name = nameof(UserName))]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = nameof(Password))]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set;  }
    }
}