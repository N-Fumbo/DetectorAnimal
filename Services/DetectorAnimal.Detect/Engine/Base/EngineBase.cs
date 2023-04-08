using DetectorAnimal.Detect.Layers;
using Microsoft.ML;
using System.Reflection;

namespace DetectorAnimal.Detect.Engine.Base
{
    public abstract class EngineBase
    {
        protected virtual PredictionEngine<LayerInput, LayerOutput> CreateEngine(string pathToModel)
        {
            if (pathToModel is null) throw new ArgumentNullException(nameof(pathToModel));

            if (File.Exists(pathToModel) is false) throw new FileNotFoundException(nameof(pathToModel));

            MLContext context = new();
            return context.Model.CreatePredictionEngine<LayerInput, LayerOutput>(context.Model.Load(pathToModel, out _));
        }
    }
}