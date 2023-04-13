using AnimalRecognition.Common.Attributes.Validation;
using System.ComponentModel.DataAnnotations;

namespace AnimalRecognition.Web.Models.AccountModels
{
    public class ConfirmEmailViewModel
    {
        [Required]
        public int Id { get; set; }

        [GuidString(ErrorMessage = "Please enter a valid code.")]
        public string Token { get; set; }
    }
}