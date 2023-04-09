import Vector from "../math objects/Vector";

class Transform {
    public position: Vector;
    public sin: number;
    public cos: number;

    constructor(position: Vector, radian: number) {
        this.position = position;
        this.sin = Math.sin(radian);
        this.cos = Math.cos(radian);
    }

    public static zero() {
        return new Transform(Vector.zero(), 0);
    }
}

export default Transform;