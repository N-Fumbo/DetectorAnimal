"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
class ModalWindow {
    constructor(modalWindowSelector) {
        const modalWidnowElement = (0, jquery_1.default)(modalWindowSelector);
        if (modalWidnowElement.length === 0)
            throw new Error(`element pop up id: ${modalWindowSelector} not found.`);
        this.elementModalWindow = modalWidnowElement;
    }
    open() {
        this.elementModalWindow.fadeIn(500);
    }
    close() {
        this.elementModalWindow.fadeOut(500);
    }
}
exports.default = ModalWindow;
