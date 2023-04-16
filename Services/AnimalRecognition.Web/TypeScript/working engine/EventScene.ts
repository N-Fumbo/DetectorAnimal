import Vector from "../engine/math objects/Vector";
import { isContainsPointInObject } from "../engine/math/geometry";
import Scene from "./Scene";
import GeometricObject from "../engine/objects/base/GeometricObject";


class EventScene {

    private readonly scene: Scene;

    private capturedObject: GeometricObject | null = null;

    private lastCursorPosition: Vector | null = null;

    private startClick: number | null = null;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public down(e: MouseEvent | TouchEvent): void {
        this.startClick = performance.now();
        const cursorPosition: Vector = EventScene.getCursorPosition(e, this.scene.view.getBoundingClientRect());
        this.capturedObject = EventScene.findCapturedObject(cursorPosition, this.scene.engine.objects);

        if (this.capturedObject !== null) {
            this.capturedObject.velocity = Vector.zero();
            this.capturedObject.isCloseGravity = true;
        }
    }

    public up(e: MouseEvent | TouchEvent): void {
        if (this.capturedObject !== null) {
            const cursorPosition: Vector = EventScene.getCursorPosition(e, this.scene.view.getBoundingClientRect());

            if (this.startClick !== null && performance.now() - this.startClick < 150 && isContainsPointInObject(cursorPosition, this.capturedObject)) {
                this.capturedObject.executeEvent('click');
            }

            this.capturedObject.isCloseGravity = false;
            this.capturedObject = null;
        }
    }

    public move(e: MouseEvent | TouchEvent, isMobile: boolean): void {
        const cursorPosition: Vector = EventScene.getCursorPosition(e, this.scene.view.getBoundingClientRect());

        if (this.capturedObject !== null) {
            this.capturedObject.velocity = this.lastCursorPosition !== null ? Vector.multiply(Vector.subtract(cursorPosition, this.lastCursorPosition), 30) : Vector.zero();
        }
        else if (!isMobile) {
            this.scene.view.style.cursor = EventScene.findCapturedObject(cursorPosition, this.scene.engine.objects) !== null ? 'pointer' : 'default';
        }

        this.lastCursorPosition = cursorPosition;
    }

    public outside(): void {
        if (this.capturedObject !== null) {
            this.capturedObject.isCloseGravity = false;
            this.capturedObject = null;
        }
    }

    private static getCursorPosition(e: MouseEvent | TouchEvent, rectCanvas: DOMRect): Vector {
        if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
            const touch = e.touches[0] || e.changedTouches[0];
            return new Vector(touch.clientX - rectCanvas.left, touch.clientY - rectCanvas.top);
        }
        else if (e instanceof MouseEvent) {
            return new Vector(e.clientX - rectCanvas.left, e.clientY - rectCanvas.top);
        }

        return Vector.zero();
    }

    private static findCapturedObject(cursorPosition: Vector, objects: Array<GeometricObject>): GeometricObject | null {
        let result = null;
        objects.forEach(object => {
            if (isContainsPointInObject(cursorPosition, object)) {
                result = object;
                return;
            }
        });

        return result;
    }
}

export default EventScene;