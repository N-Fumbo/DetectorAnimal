namespace AnimalRecognition.Web.Results.Base
{
    public class RequestResult
    {
        public bool Success { get; set; }

        public IEnumerable<ModelStateError> Errors { get; set; }

        public RequestResult(bool success, IEnumerable<ModelStateError> errors = null) => (Success, Errors) = (success, errors);
    }
}