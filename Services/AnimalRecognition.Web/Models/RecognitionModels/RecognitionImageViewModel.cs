using AnimalRecognition.Common.Attributes.Validation;
using System.ComponentModel.DataAnnotations;

namespace AnimalRecognition.Web.Models.RecognitionModels
{
    public class RecognitionImageViewModel
    {
        [Required(ErrorMessage = "An image is not selected.")]
        [TypeImage(ErrorMessage = "Invalid image format. The image should be in the format: '.jpg', '.jpeg', '.png'.")]
        [SizeImage(ErrorMessage = "The file size should not exceed 10 MB.")]
        [Display(Name = "Image")]
        public IFormFile Image { get; set; }
    }
}