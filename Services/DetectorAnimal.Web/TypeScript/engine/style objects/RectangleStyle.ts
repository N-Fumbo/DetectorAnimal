import Vector from "../math objects/Vector";
import ObjectStyle from "./base/ObjectStyle";
import { Size } from "../additional";


class RectangleStyle extends ObjectStyle {

    public draw(context: CanvasRenderingContext2D, { center, size, radian }: { center: Vector; size: Size; radian: number }): void {
        const { lineWidth, strokeStyle, fillStyle, colorText, text, img } = this.style;

        context.save();

        this.assignStyles(context);

        context.translate(center.x, center.y);

        context.rotate(radian);
        
        const drawSize = lineWidth && lineWidth > 1 ? Object.assign({}, size) : size;

        if (lineWidth && lineWidth > 1) {
            let halfLineWidth = lineWidth / 2;
            drawSize.width -= halfLineWidth;
            drawSize.height -= halfLineWidth;
        }

        if (fillStyle) context.fillRect(-drawSize.width / 2, -drawSize.height / 2, drawSize.width, drawSize.height);

        if (strokeStyle) context.strokeRect(-drawSize.width / 2, -drawSize.height / 2, drawSize.width, drawSize.height);

        if (img || text) {

            if (img) {
                context.clip();
                context.drawImage(img, -drawSize.width / 2, -drawSize.height / 2, drawSize.width, drawSize.height);
            }

            if (text) {
                if (colorText) context.fillStyle = colorText;

                context.fillText(text, 0, 0);
            }
        }

        context.restore();
    }
}

export default RectangleStyle;