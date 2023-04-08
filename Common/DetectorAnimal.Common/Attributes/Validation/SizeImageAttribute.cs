using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Common.Attributes.Validation
{
    public class SizeImageAttribute : ValidationAttribute
    {
        private const int MAX_SIZE = 10 * 1024 * 1024; // 10 МБ

        public override bool IsValid(object value) =>
            value != null && value is IFormFile file && file.Length != 0 && file.Length <= MAX_SIZE;
    }
}