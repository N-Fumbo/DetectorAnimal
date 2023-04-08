using Microsoft.ML.Data;

namespace DetectorAnimal.Detect.Layers
{
    public class LayerInput
    {
        [LoadColumn(0)]
        [ColumnName(@"Label")]
        public string Label { get; set; }

        [LoadColumn(1)]
        [ColumnName(@"ImageSource")]
        public byte[] ImageSource { get; set; }
    }
}