import { Style } from "../../additional";

abstract class ObjectStyle {

    constructor(public style: Style) { }

    public assignStyles(context: CanvasRenderingContext2D): void {

        const { strokeStyle, fillStyle, lineWidth, font = '20px sans-serif' } = this.style;

        if(strokeStyle) context.strokeStyle = strokeStyle;

        if (fillStyle) context.fillStyle = fillStyle;

        if (lineWidth) context.lineWidth = lineWidth;

        if (this.style.text) {
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = font;
        }
    }

    public abstract draw(context: CanvasRenderingContext2D, params: any): void;
}

export default ObjectStyle;