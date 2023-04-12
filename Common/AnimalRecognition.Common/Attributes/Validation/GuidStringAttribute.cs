using System.ComponentModel.DataAnnotations;

namespace AnimalRecognition.Common.Attributes.Validation
{
    public class GuidStringAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is null) return false;

            string guidString = value.ToString();

            if (guidString.Length != 36) return false;

            return Guid.TryParse(guidString, out Guid _);
        }
    }
}