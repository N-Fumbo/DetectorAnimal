"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectStyle {
    constructor(style) {
        this.style = style;
    }
    assignStyles(context) {
        const { strokeStyle, fillStyle, lineWidth, font = '20px sans-serif' } = this.style;
        if (strokeStyle)
            context.strokeStyle = strokeStyle;
        if (fillStyle)
            context.fillStyle = fillStyle;
        if (lineWidth)
            context.lineWidth = lineWidth;
        if (this.style.text) {
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = font;
        }
    }
}
exports.default = ObjectStyle;
