import { Style } from "./engine/additional";
import Vector from "./engine/math objects/Vector";

const baseStyle: Style = { strokeStyle: 'white', lineWidth: 5 };

const getRandomNumber = (min: number, max: number): number => {
    return min + Math.floor(Math.random() * (max - min + 1));
}

const getMousePositionCanvas = (e: MouseEvent, rectCanvas: DOMRect): Vector => {
    return new Vector(e.clientX - rectCanvas.left, e.clientY - rectCanvas.top);
};

export { baseStyle, getRandomNumber, getMousePositionCanvas };