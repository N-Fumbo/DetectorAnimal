using DetectorAnimal.Common;
using DetectorAnimal.Detect;
using DetectorAnimal.Web.Models.DetectModels;
using Microsoft.AspNetCore.Mvc;

namespace DetectorAnimal.Web.Controllers
{
    public class DetectController : Controller
    {
        private readonly ImageRecognition _recognition;

        public DetectController(ImageRecognition recognition) => _recognition = recognition;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DetectImage(DetectImageViewModel model)
        {
            if (ModelState.IsValid)
            {
                byte[] image = await Helper.ConvertIFormFileToByteArrayAsync(model.Image).ConfigureAwait(false);

                var result = await _recognition.Recognition(image).ConfigureAwait(false);

                return Json(result);
            }

            return Ok();
        }
    }
}