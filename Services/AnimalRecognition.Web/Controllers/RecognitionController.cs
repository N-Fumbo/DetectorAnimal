using AnimalRecognition.Web.Models.RecognitionModels;
using AnimalRecognition.Common;
using AnimalRecognition.Detect;
using Microsoft.AspNetCore.Mvc;
using AnimalRecognition.Web.Dto.Request.Base;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using AnimalRecognition.Web.Dto.Request;

namespace AnimalRecognition.Web.Controllers
{
    public class RecognitionController : Controller
    {
        private readonly ImageRecognition _recognition;

        public RecognitionController(ImageRecognition recognition) => _recognition = recognition;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<RequestRecognitionResult> RecognitionImage(RecognitionImageViewModel model)
        {
            if (ModelState.IsValid)
            {
                byte[] image = await Helper.ConvertIFormFileToByteArrayAsync(model.Image).ConfigureAwait(false);

                var result = await _recognition.Recognition(image).ConfigureAwait(false);

                return new RequestRecognitionResult(true, result.Entity, result.Percent);
            }

            var errors = ModelState.Where(x => x.Value.ValidationState == ModelValidationState.Invalid).Select(x =>
                new ModelStateError(x.Key, x.Value.Errors.Count > 0 ? x.Value.Errors[0].ErrorMessage : string.Empty)
            );

            return new RequestRecognitionResult(false, errors);
        }
    }
}