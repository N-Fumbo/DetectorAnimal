using AnimalRecognition.Web.Results.Base;

namespace AnimalRecognition.Web.Results
{
    public class RequestRecognitionResult : RequestResult
    {
        public string Entity { get; set; }

        public float? Percent { get; set; }

        public RequestRecognitionResult(bool success, IEnumerable<ModelStateError> errors = null) : base(success, errors) { }

        public RequestRecognitionResult(bool success, string entity, float percent) : base(success, null) => 
            (Entity, Percent) = (entity, percent);
    }
}