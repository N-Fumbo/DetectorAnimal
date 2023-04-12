using AnimalRecognition.Web.Models.RecognitionModels;
using AnimalRecognition.Web.Models.AccountModels;

namespace AnimalRecognition.Web.Models
{
    public class IndexViewModel
    {
        public RegisterViewModel Register { get; set; }

        public LogInViewModel Login { get; set; }

        public RecognitionImageViewModel Recognition { get; set; }
    }
}