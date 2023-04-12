using System.ComponentModel.DataAnnotations;

namespace AnimalRecognition.Web.Models.AccountModels.Base
{
    public class BaseAccountViewModel
    {
        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [EmailAddress(ErrorMessage = "Введите корректный email адрес.")]
        [Display(Name = nameof(Email))]
        public string Email { get; set; }

        [Required(ErrorMessage = "Это поле не может быть пустым.")]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Длина пароля должна быть от 6 до 15 символов.")]
        [MaxLength(15, ErrorMessage = "Длина пароля должна быть от 6 до 15 символов.")]
        [RegularExpression(@"^(?=.*\d)(?=.*[A-Z]).+$", ErrorMessage = "Пароль должен содержать хотя бы одну цифру и одну заглавную букву.")]
        [Display(Name = "Пароль")]
        public string Password { get; set; }
    }
}