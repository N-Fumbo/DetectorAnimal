import Vector from "./engine/math objects/Vector";

interface RequestResult {
    success: boolean;
    errors?: Error[];
}

interface RequestRecognitionResult extends RequestResult {
    entity: string | null;
    percent: number | null;
}

interface Error {
    key: string;
    errorMessage: string;
}

const getRandomNumber = (min: number, max: number): number => {
    return min + Math.floor(Math.random() * (max - min + 1));
}

const getMousePositionCanvas = (e: MouseEvent, rectCanvas: DOMRect): Vector => {
    return new Vector(e.clientX - rectCanvas.left, e.clientY - rectCanvas.top);
};

export { RequestResult, RequestRecognitionResult, getRandomNumber, getMousePositionCanvas };