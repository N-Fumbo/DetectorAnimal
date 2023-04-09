import Mask from "../../math objects/Mask";
import Vector from "../../math objects/Vector";
import { clamp } from "../../additional";
import IDrawObject from "../../style objects/base/IDrawObject";
import ObjectStyle from "../../style objects/base/ObjectStyle";

abstract class PhysicalObject {

    public isCloseGravity: boolean = false;

    public velocity: Vector = Vector.zero();

    public angularVelocity: number = 0;

    public force: Vector = Vector.zero();

    public readonly elasticity: number;

    public abstract area: number;

    public abstract mass: number;

    public abstract inertia: number;

    public abstract invMass: number;

    public abstract invInertia: number;

    constructor(public center: Vector, public radian: number, elasticity: number, readonly density: number, readonly isStatic: boolean) {
        this.elasticity = clamp(elasticity, 0, 1);
    }

    public move(vector: Vector): void {
        this.center = Vector.add(this.center, vector);
    }

    public moveTo(vector: Vector): void {
        this.center = vector;
    }

    public step(gravity: Vector, time: number): void {
        if (this.isStatic) return;

        this.changeVelocity(gravity, time);

        this.center = Vector.add(this.center, Vector.multiply(this.velocity, time));

        this.radian += this.angularVelocity * time;

        this.force = Vector.zero();
    }

    private changeVelocity(gravity: Vector, time: number): void {
        let acceleration = Vector.divide(this.force, this.mass);

        this.velocity = Vector.add(this.velocity, acceleration);

        if (!this.isCloseGravity) {
            this.velocity = Vector.add(this.velocity, Vector.multiply(gravity, time));
        }
    }

    public abstract getMask(): Mask;
}

export default PhysicalObject;