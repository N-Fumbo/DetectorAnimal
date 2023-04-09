"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectStyle_1 = __importDefault(require("./base/ObjectStyle"));
class CircleStyle extends ObjectStyle_1.default {
    draw(context, { center, radius, radian }) {
        const { lineWidth, strokeStyle, fillStyle, colorText, text, img } = this.style;
        context.beginPath();
        this.assignStyles(context);
        const drawRadius = lineWidth && lineWidth > 1 ? radius - (lineWidth / 2) : radius;
        context.arc(center.x, center.y, drawRadius, 0, 2 * Math.PI);
        if (strokeStyle)
            context.stroke();
        if (fillStyle && !img)
            context.fill();
        context.closePath();
        if (text || img) {
            context.save();
            context.translate(center.x, center.y);
            context.rotate(radian);
            if (img) {
                context.clip();
                context.drawImage(img, -drawRadius, -drawRadius, drawRadius * 2, drawRadius * 2);
            }
            if (text) {
                if (colorText)
                    context.fillStyle = colorText;
                context.fillText(text, 0, 0);
            }
            context.restore();
        }
    }
}
exports.default = CircleStyle;
