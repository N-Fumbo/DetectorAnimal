using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace DetectorAnimal.Common.Attributes.Validation
{
    public class TypeImageAttribute : ValidationAttribute
    {
        private static readonly IReadOnlyList<string> _allowedExtensions = new List<string>() { ".jpg", ".jpeg", ".png" };

        public override bool IsValid(object value)
        {
            if (value is null) return false;

            if (value is IFormFile file && file.Length != 0)
            {
                string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

                if (_allowedExtensions.Contains(fileExtension)) return true;
            }

            return false;
        }
    }
}