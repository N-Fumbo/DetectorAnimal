using DetectorAnimal.Detect.Engine.Base;
using DetectorAnimal.Detect.Layers;
using Microsoft.ML;
using System.Reflection;

namespace DetectorAnimal.Detect.Engine
{
    public class EngineRecognition : EngineBase
    {
        private static readonly string _appDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        public readonly Lazy<PredictionEngine<LayerInput, LayerOutput>> EngineAnimal;

        public EngineRecognition() =>
            EngineAnimal = new(() => CreateEngine($"{_appDirectory}/Models/ModelAnimal.zip"), true);
    }
}