import ObjectStyle from "./ObjectStyle";

interface IDrawObject{
    readonly style: ObjectStyle | null;

    draw(context: CanvasRenderingContext2D): void;
}

export default IDrawObject;