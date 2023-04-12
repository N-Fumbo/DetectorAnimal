using Microsoft.AspNetCore.Http;

namespace AnimalRecognition.Common
{
    public static class Helper
    {
        public static async Task<byte[]> ConvertIFormFileToByteArrayAsync(IFormFile file)
        {
            using var memoryStream = new MemoryStream();

            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}
