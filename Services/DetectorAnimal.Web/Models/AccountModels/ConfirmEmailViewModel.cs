using DetectorAnimal.Common.Attributes.Validation;
using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Web.Models.AccountModels
{
    public class ConfirmEmailViewModel
    {
        [Required]
        public int Id { get; set; }

        [GuidString(ErrorMessage = "Введите корректный код")]
        public string Token { get; set; }
    }
}