using Microsoft.ML.Data;

namespace DetectorAnimal.Detect.Layers
{
    public class LayerOutput
    {
        [ColumnName(@"Label")]
        public uint Label { get; set; }

        [ColumnName(@"ImageSource")]
        public byte[] ImageSource { get; set; }

        [ColumnName(@"PredictedLabel")]
        public string PredictedLabel { get; set; }

        [ColumnName(@"Score")]
        public float[] Score { get; set; }
    }
}