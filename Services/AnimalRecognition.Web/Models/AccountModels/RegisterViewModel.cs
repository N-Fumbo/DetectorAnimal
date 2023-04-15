using AnimalRecognition.Web.Models.AccountModels.Base;
using System.ComponentModel.DataAnnotations;

namespace AnimalRecognition.Web.Models.AccountModels
{
    public class RegisterViewModel : BaseAccountViewModel
    {
        [Required(ErrorMessage = "The 'Name' field cannot be empty.")]
        [MinLength(2, ErrorMessage = "Please enter a valid name.")]
        [MaxLength(40, ErrorMessage = "Please enter a valid name.")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The 'Confirm your password' field cannot be empty.")]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "The passwords do not match.")]
        [MinLength(6, ErrorMessage = "The password length should be between 6 and 15 characters.")]
        [MaxLength(15, ErrorMessage = "The password length should be between 6 and 15 characters.")]
        [Display(Name = "Confirm your password")]
        public string PasswordConfirmed { get; set; }
    }
}