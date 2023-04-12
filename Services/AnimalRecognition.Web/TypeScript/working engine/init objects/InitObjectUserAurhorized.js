"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModalWindow_1 = __importDefault(require("../../ModalWindow"));
const RectangleStyle_1 = __importDefault(require("../../engine/style objects/RectangleStyle"));
const InitObject_1 = __importDefault(require("./base/InitObject"));
class InitObjectUserAurhorized extends InitObject_1.default {
    init(sizeCanvas) {
        const result = [];
        const buttonCanvasElements = document.getElementsByClassName('button_canvas');
        if (buttonCanvasElements.length > 0 && buttonCanvasElements[0] !== null) {
            const fontSize = window.getComputedStyle(buttonCanvasElements[0]).fontSize.replace('px', '');
            const fontFamily = 'Calibri, sans-serif';
            const font = `${fontSize}px ${fontFamily}`;
            const butLogOut = this.createObjectByElementId('button_canvas_logout', new RectangleStyle_1.default({ font, strokeStyle: 'black', colorText: 'black', lineWidth: 2 }));
            if (butLogOut !== null) {
                butLogOut.addEvent('click', () => {
                });
                result.push(butLogOut);
            }
            const butDetect = this.createObjectByElementId('button_canvas_detect', new RectangleStyle_1.default({ font, strokeStyle: 'black', fillStyle: 'black', colorText: 'white', lineWidth: 2 }));
            if (butDetect !== null) {
                butDetect.addEvent('click', () => {
                    new ModalWindow_1.default('#modal_window_recognition').open();
                });
                result.push(butDetect);
            }
            const rectangleName = this.createObjectByElementId('rectangle_name', new RectangleStyle_1.default({ font, strokeStyle: 'black', colorText: 'black', lineWidth: 2 }));
            if (rectangleName != null) {
                result.push(rectangleName);
            }
            result.push(...this.createCircles());
            result.push(...this.creatingBorders(sizeCanvas));
        }
        return result;
    }
}
exports.default = InitObjectUserAurhorized;
