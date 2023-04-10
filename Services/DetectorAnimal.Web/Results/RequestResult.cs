namespace DetectorAnimal.Web.Results
{
    public record RequestResult(bool Success, IEnumerable<ModelStateError>? Errors);
}