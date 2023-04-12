import Mask from "../math objects/Mask";
import Vector from "../math objects/Vector";
import CircleStyle from "../style objects/CircleStyle";
import GeometricObject from "./base/GeometricObject";

class Circle extends GeometricObject{
    public area: number;
    public mass: number;
    public inertia: number;
    public invMass: number;
    public invInertia: number;

    public radius: number;

    public style: CircleStyle | null;

    constructor(center: Vector, radius: number, style: CircleStyle | null, radian: number = 0, elasticity: number = 0.6, density: number = 1, isStatic: boolean = false) {
        super(center, radian, elasticity, density, isStatic);
        this.radius = radius;

        this.area = this.radius ** 2 * Math.PI;

        if (!this.isStatic) {
            this.mass = this.area * this.density;
            this.inertia = 0.5 * this.mass * this.radius ** 2;
            this.invMass = 1 / this.mass;
            this.invInertia = 1 / this.inertia;
        }
        else {
            this.mass = this.inertia = this.invMass = this.invInertia = 0;
        }

        this.style = style;
    }

    public getMask(): Mask {
        let min = new Vector(this.center.x - this.radius, this.center.y - this.radius);
        let max = new Vector(this.center.x + this.radius, this.center.y + this.radius);

        return new Mask(min, max);
    }

    public draw(context: CanvasRenderingContext2D): void {
        if(this.style){
            this.style.draw(context, { center: this.center, radius: this.radius, radian: this.radian });
        }
    }
}

export default Circle;