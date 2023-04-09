import Mask from "../math objects/Mask";
import Vector from "../math objects/Vector";
import { Size } from "../additional";
import Transform from "../math objects/Transform";
import RectangleStyle from "../style objects/RectangleStyle";
import GeometricObject from "./base/GeometricObject";

class Rectangle extends GeometricObject {

    public area: number;
    public mass: number;
    public inertia: number;
    public invMass: number;
    public invInertia: number;

    public style: RectangleStyle | null;

    private _vertices: Array<Vector>;
    private _verticesTransform: Array<Vector>;
    private _isActualVerticesTransform: boolean;

    constructor(center: Vector, public size: Size, style: RectangleStyle | null, radian: number = 0, elasticity: number = 0.6, density: number = 1, isStatic: boolean = false) {
        super(center, radian, elasticity, density, isStatic);

        this.area = Math.abs(size.width) * Math.abs(size.height);

        if (!this.isStatic) {
            this.mass = this.area * this.density;
            this.inertia = (1 / 12) * this.mass * (this.size.width ** 2 + this.size.height ** 2);
            this.invMass = 1 / this.mass;
            this.invInertia = 1 / this.inertia;
        }
        else {
            this.mass = this.inertia = this.invMass = this.invInertia = 0;
        }

        this._vertices = this.getVertices();

        this._verticesTransform = this.getTransformVertices();
        this._isActualVerticesTransform = true;

        this.style = style;
    }

    public step(gravity: Vector, time: number): void {
        super.step(gravity, time);
        this._isActualVerticesTransform = false;
    }

    public getMask(): Mask {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;

        const vertices = this.getTransformVertices();
        for (let i = 0; i < vertices.length; i++) {
            const v = vertices[i];
            if (v.x < minX) minX = v.x;
            if (v.x > maxX) maxX = v.x;
            if (v.y < minY) minY = v.y;
            if (v.y > maxY) maxY = v.y;
        }

        return new Mask(new Vector(minX, minY), new Vector(maxX, maxY));
    }

    public getTransformVertices(): Array<Vector> {
        if (!this._isActualVerticesTransform) {
            const transform: Transform = new Transform(this.center, this.radian);

            this._verticesTransform = new Array<Vector>(this._vertices.length);

            for (let i = 0; i < this._vertices.length; i++) {
                const vertex = this._vertices[i];
                this._verticesTransform[i] = Vector.transform(vertex, transform);
            }

            this._isActualVerticesTransform = true;
        }

        return this._verticesTransform;
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (this.style) {
            this.style.draw(context, { center: this.center, size: this.size, radian: this.radian });
        }
    }

    private getVertices(): Array<Vector> {
        const halfSize: Size = { width: this.size.width / 2, height: this.size.height / 2 };
        return [
            new Vector(-halfSize.width, -halfSize.height),
            new Vector(halfSize.width, -halfSize.height),
            new Vector(halfSize.width, halfSize.height),
            new Vector(-halfSize.width, halfSize.height),
        ];
    }

}

export default Rectangle;