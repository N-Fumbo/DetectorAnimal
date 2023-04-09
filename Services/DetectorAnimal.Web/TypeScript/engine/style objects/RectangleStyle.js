"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectStyle_1 = __importDefault(require("./base/ObjectStyle"));
class RectangleStyle extends ObjectStyle_1.default {
    draw(context, { center, size, radian }) {
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
        if (fillStyle)
            context.fillRect(-drawSize.width / 2, -drawSize.height / 2, drawSize.width, drawSize.height);
        if (strokeStyle)
            context.strokeRect(-drawSize.width / 2, -drawSize.height / 2, drawSize.width, drawSize.height);
        if (img || text) {
            if (img) {
                context.clip();
                context.drawImage(img, -drawSize.width / 2, -drawSize.height / 2, drawSize.width, drawSize.height);
            }
            if (text) {
                if (colorText)
                    context.fillStyle = colorText;
                context.fillText(text, 0, 0);
            }
        }
        context.restore();
    }
}
exports.default = RectangleStyle;
