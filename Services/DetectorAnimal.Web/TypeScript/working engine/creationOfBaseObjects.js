"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModalWindow_1 = __importDefault(require("../ModalWindow"));
const Vector_1 = __importDefault(require("../engine/math objects/Vector"));
const Circle_1 = __importDefault(require("../engine/objects/Circle"));
const Rectangle_1 = __importDefault(require("../engine/objects/Rectangle"));
const CircleStyle_1 = __importDefault(require("../engine/style objects/CircleStyle"));
const RectangleStyle_1 = __importDefault(require("../engine/style objects/RectangleStyle"));
function createObjectByElementId(elementId, style) {
    const element = document.getElementById(elementId);
    if (element === null)
        return null;
    const rect = element.getBoundingClientRect();
    if (style instanceof RectangleStyle_1.default)
        return new Rectangle_1.default(new Vector_1.default(rect.left + rect.width / 2, rect.top + rect.height / 2), { width: rect.width, height: rect.height }, style);
    else if (style instanceof CircleStyle_1.default)
        return new Circle_1.default(new Vector_1.default(rect.left + rect.width / 2, rect.top + rect.height / 2), (rect.width / 2), style);
    else {
        throw new Error('unknown type style.');
    }
}
const creatingBorders = (sizeCanvas) => {
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
};
const createObjects = (sizeCanvas) => {
    const result = [];
    const buttonCanvasElements = document.getElementsByClassName('button_canvas');
    if (buttonCanvasElements.length > 0 && buttonCanvasElements[0] !== null) {
        //Buttons
        const fontSize = window.getComputedStyle(buttonCanvasElements[0]).fontSize.replace('px', '');
        const fontFamily = 'Calibri, sans-serif';
        const font = `${fontSize}px ${fontFamily}`;
        const butLogIn = createObjectByElementId('button_canvas_login', new RectangleStyle_1.default({ font, strokeStyle: 'black', colorText: 'black', lineWidth: 2, text: 'Log In' }));
        if (butLogIn !== null) {
            butLogIn.addEvent('click', () => {
                const moduleWindowLogIn = new ModalWindow_1.default('#modal_window_login');
                moduleWindowLogIn.open();
            });
            result.push(butLogIn);
        }
        const butDetect = createObjectByElementId('button_canvas_detect', new RectangleStyle_1.default({ font, strokeStyle: 'black', fillStyle: 'black', colorText: 'white', lineWidth: 2, text: 'Detect' }));
        if (butDetect !== null) {
            butDetect.addEvent('click', () => {
                const moduleWindowLogIn = new ModalWindow_1.default('#modal_window_detect');
                moduleWindowLogIn.open();
            });
            result.push(butDetect);
        }
        //Circles
        const circleImg1 = document.getElementById('circle_1_img');
        if (circleImg1 !== null) {
            const circle1 = createObjectByElementId('circle_1', new CircleStyle_1.default({ fillStyle: 'red', img: circleImg1 }));
            if (circle1 !== null)
                result.push(circle1);
        }
        const circleImg2 = document.getElementById('circle_2_img');
        if (circleImg2 !== null) {
            const circle2 = createObjectByElementId('circle_2', new CircleStyle_1.default({ fillStyle: 'blue', img: circleImg2 }));
            if (circle2 !== null)
                result.push(circle2);
        }
        result.push(...creatingBorders(sizeCanvas));
    }
    return result;
};
exports.default = createObjects;
