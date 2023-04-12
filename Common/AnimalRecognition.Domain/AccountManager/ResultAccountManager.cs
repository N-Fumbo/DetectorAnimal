namespace AnimalRecognition.Domain.AccountManager
{
    public class ResultAccountManager<T>
    {
        public StatusCodeAccount StatusCode { get; set; }

        public T Data { get; set; }
    }
}