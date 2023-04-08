using DetectorAnimal.Detect.Engine;
using DetectorAnimal.Detect.Layers;
using DetectorAnimal.Domain.ImageRecognition;

namespace DetectorAnimal.Detect
{
    public class ImageRecognition
    {
        private static readonly IReadOnlyList<EngineRecognition> _engines = Enumerable.Repeat(new EngineRecognition(), 3).ToList();

        private static readonly SemaphoreSlim _semaphore = new(_engines.Count);

        public async Task<RecognitionResult> Recognition(byte[] image, CancellationToken cancel = default)
        {
            await _semaphore.WaitAsync(cancel).ConfigureAwait(false);

            try
            {
                EngineRecognition engine = _engines[_engines.Count - (_semaphore.CurrentCount + 1)];

                LayerInput input = new() { ImageSource = image };

                LayerOutput output = engine.EngineAnimal.Value.Predict(input);

                return new()
                {
                    Entity = output.PredictedLabel,
                    Percent = output.Score.Max()
                };
            }
            finally
            {
                _semaphore.Release();
            }
        }
    }
}