"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../../../engine/math objects/Vector"));
const Circle_1 = __importDefault(require("../../../engine/objects/Circle"));
const Rectangle_1 = __importDefault(require("../../../engine/objects/Rectangle"));
const CircleStyle_1 = __importDefault(require("../../../engine/style objects/CircleStyle"));
const RectangleStyle_1 = __importDefault(require("../../../engine/style objects/RectangleStyle"));
class InitObject {
    createObjectByElementId(elementId, style) {
        const element = document.getElementById(elementId);
        if (element === null)
            return null;
        style.style.text = element.innerText;
        const rect = element.getBoundingClientRect();
        if (style instanceof RectangleStyle_1.default)
            return new Rectangle_1.default(new Vector_1.default(rect.left + rect.width / 2, rect.top + rect.height / 2), { width: rect.width, height: rect.height }, style);
        else if (style instanceof CircleStyle_1.default)
            return new Circle_1.default(new Vector_1.default(rect.left + rect.width / 2, rect.top + rect.height / 2), (rect.width / 2), style);
        else {
            throw new Error('unknown type style.');
        }
    }
    creatingBorders(sizeCanvas) {
        const result = [];
        const sizeHorizontal = { width: sizeCanvas.width, height: 1000 };
        const sizeVertical = { width: 1000, height: sizeCanvas.height };
        const bordersData = [
            //Bottom
            { position: new Vector_1.default(sizeCanvas.width / 2, sizeCanvas.height + (sizeHorizontal.height / 2)), size: sizeHorizontal },
            //Top
            { position: new Vector_1.default(sizeCanvas.width / 2, 0 - (sizeHorizontal.height / 2)), size: sizeHorizontal },
            //Left
            { position: new Vector_1.default(0 - (sizeVertical.width / 2), sizeCanvas.height / 2), size: sizeVertical },
            //Right
            { position: new Vector_1.default(sizeCanvas.width + (sizeVertical.width / 2), sizeCanvas.height / 2), size: sizeVertical }
        ];
        bordersData.forEach(x => result.push(new Rectangle_1.default(x.position, x.size, null, 0, 0.5, 1, true)));
        return result;
    }
    createCircles() {
        const result = [];
        const circleImg1 = document.getElementById('circle_1_img');
        if (circleImg1 !== null) {
            const circle1 = this.createObjectByElementId('circle_1', new CircleStyle_1.default({ fillStyle: 'red', img: circleImg1 }));
            if (circle1 !== null)
                result.push(circle1);
        }
        const circleImg2 = document.getElementById('circle_2_img');
        if (circleImg2 !== null) {
            const circle2 = this.createObjectByElementId('circle_2', new CircleStyle_1.default({ fillStyle: 'blue', img: circleImg2 }));
            if (circle2 !== null)
                result.push(circle2);
        }
        return result;
    }
}
exports.default = InitObject;
