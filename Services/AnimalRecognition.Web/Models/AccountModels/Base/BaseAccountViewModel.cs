using System.ComponentModel.DataAnnotations;

namespace AnimalRecognition.Web.Models.AccountModels.Base
{
    public class BaseAccountViewModel
    {
        [Required(ErrorMessage = "The 'Email' field cannot be empty.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [Display(Name = nameof(Email))]
        public string Email { get; set; }

        [Required(ErrorMessage = "The 'Password' field cannot be empty.")]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "The password length should be between 6 and 15 characters.")]
        [MaxLength(15, ErrorMessage = "The password length should be between 6 and 15 characters.")]
        [RegularExpression(@"^(?=.*\d)(?=.*[A-Z]).+$", ErrorMessage = "The password must contain at least one digit and one uppercase letter.")]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}