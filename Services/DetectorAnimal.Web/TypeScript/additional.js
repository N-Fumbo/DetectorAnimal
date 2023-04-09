"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMousePositionCanvas = exports.getRandomNumber = exports.baseStyle = void 0;
const Vector_1 = __importDefault(require("./engine/math objects/Vector"));
const baseStyle = { strokeStyle: 'white', lineWidth: 5 };
exports.baseStyle = baseStyle;
const getRandomNumber = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
};
exports.getRandomNumber = getRandomNumber;
const getMousePositionCanvas = (e, rectCanvas) => {
    return new Vector_1.default(e.clientX - rectCanvas.left, e.clientY - rectCanvas.top);
};
exports.getMousePositionCanvas = getMousePositionCanvas;
