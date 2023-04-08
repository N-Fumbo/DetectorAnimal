using DetectorAnimal.Web.Models.AccountModels;
using DetectorAnimal.Web.Models.DetectModels;

namespace DetectorAnimal.Web.Models
{
    public class IndexViewModel
    {
        public RegisterViewModel Register { get; set; }

        public LogInViewModel Login { get; set; }

        public DetectImageViewModel Detect { get; set; }
    }
}