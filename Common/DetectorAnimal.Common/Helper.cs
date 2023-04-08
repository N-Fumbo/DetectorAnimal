﻿using Microsoft.AspNetCore.Http;

namespace DetectorAnimal.Common
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
