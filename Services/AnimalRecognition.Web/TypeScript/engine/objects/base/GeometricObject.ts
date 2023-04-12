import IDrawObject from "../../style objects/base/IDrawObject";
import ObjectStyle from "../../style objects/base/ObjectStyle";
import IEventObject from "./IEventObject";
import PhysicalObject from "./PhysicalObject";

abstract class GeometricObject extends PhysicalObject implements IDrawObject, IEventObject {

    public abstract style: ObjectStyle | null;

    public readonly events: Map<string, () => void> = new Map<string, () => void>;

    public addEvent(eventKey: string, callback: () => void): void {
        if (!this.events.has(eventKey)) {
            this.events.set(eventKey, callback);
        }
    }

    public removeEvent(eventKey: string): void {
        if (this.events.has(eventKey)) {
            this.events.delete(eventKey);
        }
    }

    public executeEvent(eventKey: string): void {
        if (this.events.has(eventKey)) {
            const callback = this.events.get(eventKey);
            if (callback !== undefined) {
                callback();
            }
        }
    }

    public abstract draw(context: CanvasRenderingContext2D): void;
}

export default GeometricObject;