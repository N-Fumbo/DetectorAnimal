using DetectorAnimal.Common.Attributes.Validation;
using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Web.Models.DetectModels
{
    public class DetectImageViewModel
    {
        [Required(ErrorMessage = "Изображение не выбрано.")]
        [TypeImage(ErrorMessage = "Неверный тип изображения. Изображение должны быть типа: '.jpg', '.jpeg', '.png'")]
        [SizeImage(ErrorMessage = "Размер файла не должен привышать 10 МБ.")]
        [Display(Name = "Изображение")]
        public IFormFile Image { get; set; }
    }
}