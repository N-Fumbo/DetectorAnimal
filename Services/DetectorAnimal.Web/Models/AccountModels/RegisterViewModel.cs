using DetectorAnimal.Web.Models.AccountModels.Base;
using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Web.Models.AccountModels
{
    public class RegisterViewModel : BaseAccountViewModel
    {
        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [MinLength(2, ErrorMessage = "Введите корректное имя.")]
        [MaxLength(40, ErrorMessage = "Введите корректное имя.")]
        [Display(Name = "Имя")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "Пароли не совпадают")]
        [Display(Name = "Подтвердите пароль")]
        public string PasswordConfirmed { get; set; }
    }
}