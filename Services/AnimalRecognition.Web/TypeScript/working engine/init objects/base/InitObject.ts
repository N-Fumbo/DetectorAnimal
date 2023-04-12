import { Size } from "../../../engine/additional";
import Vector from "../../../engine/math objects/Vector";
import Circle from "../../../engine/objects/Circle";
import Rectangle from "../../../engine/objects/Rectangle";
import GeometricObject from "../../../engine/objects/base/GeometricObject";
import CircleStyle from "../../../engine/style objects/CircleStyle";
import RectangleStyle from "../../../engine/style objects/RectangleStyle";
import ObjectStyle from "../../../engine/style objects/base/ObjectStyle";

abstract class InitObject {

    public abstract init(sizeCanvas: Size): Array<GeometricObject>;
    
    public createObjectByElementId(elementId: string, style: RectangleStyle): Rectangle | null;
    public createObjectByElementId(elementId: string, style: CircleStyle): Circle | null;

    public createObjectByElementId(elementId: string, style: ObjectStyle): GeometricObject | null {
        const element = document.getElementById(elementId);
        if (element === null) return null;

        style.style.text = element.innerText;

        const rect: DOMRect = element.getBoundingClientRect();

        if (style instanceof RectangleStyle)
            return new Rectangle(new Vector(rect.left + rect.width / 2, rect.top + rect.height / 2), { width: rect.width, height: rect.height }, style);
        else if (style instanceof CircleStyle)
            return new Circle(new Vector(rect.left + rect.width / 2, rect.top + rect.height / 2), (rect.width / 2), style);
        else {
            throw new Error('unknown type style.');
        }
    }

    public creatingBorders(sizeCanvas: Size): Array<Rectangle>{
        const result: Array<Rectangle> = [];
        const sizeHorizontal: Size = { width: sizeCanvas.width, height: 1000 };
        const sizeVertical: Size = { width: 1000, height: sizeCanvas.height };

        const bordersData: Array<{ position: Vector, size: Size }> = [
            //Bottom
            { position: new Vector(sizeCanvas.width / 2, sizeCanvas.height + (sizeHorizontal.height / 2)), size: sizeHorizontal },
            //Top
            { position: new Vector(sizeCanvas.width / 2, 0 - (sizeHorizontal.height / 2)), size: sizeHorizontal },
            //Left
            { position: new Vector(0 - (sizeVertical.width / 2), sizeCanvas.height / 2), size: sizeVertical },
            //Right
            { position: new Vector(sizeCanvas.width + (sizeVertical.width / 2), sizeCanvas.height / 2), size: sizeVertical }
        ];

        bordersData.forEach(x => result.push(new Rectangle(x.position, x.size, null, 0, 0.5, 1, true)));

        return result;
    }

    public createCircles(): Array<Circle> {
        const result: Array<Circle> = [];

        const circleImg1: HTMLImageElement = document.getElementById('circle_1_img') as HTMLImageElement;
        if (circleImg1 !== null) {
            const circle1: Circle | null = this.createObjectByElementId('circle_1', new CircleStyle({ fillStyle: 'red', img: circleImg1 }));
            if (circle1 !== null) result.push(circle1);
        }
        const circleImg2: HTMLImageElement = document.getElementById('circle_2_img') as HTMLImageElement;
        if (circleImg2 !== null) {
            const circle2: Circle | null = this.createObjectByElementId('circle_2', new CircleStyle({ fillStyle: 'blue', img: circleImg2 }));
            if (circle2 !== null) result.push(circle2);
        }

        return result;
    }
}

export default InitObject;