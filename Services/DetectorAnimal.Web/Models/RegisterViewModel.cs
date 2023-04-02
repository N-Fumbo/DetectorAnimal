using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Web.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [MinLength(2, ErrorMessage = "Введите корректное имя.")]
        [MaxLength(40, ErrorMessage = "Введите корректное имя.")]
        [Display(Name = "Имя")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [EmailAddress(ErrorMessage = "Введите корректный email адрес.")]
        [Display(Name = nameof(Email))]
        public string Email { get; set; }

        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Длина пароля должна быть от 6 до 15 символов.")]
        [MaxLength(15, ErrorMessage = "Длина пароля должна быть от 6 до 15 символов.")]
        [RegularExpression(@"^(?=.{6,15})(?=.*\d)(?=.*[A-Z])[^\s]*$", ErrorMessage = "Пароль должен содержать хотя бы одну цифру и одну заглавную букву.")]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "Пароли не совпадают")]
        [Display(Name = "Подтвердите пароль")]
        public string PasswordConfirmed { get; set; }
    }
}