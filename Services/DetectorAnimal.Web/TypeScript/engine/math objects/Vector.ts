import Transform from "../math objects/Transform";

class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static zero(): Vector {
        return new Vector(0, 0);
    }

    public static reverse(v: Vector): Vector {
        return new Vector(-v.x, -v.y);
    }

    public static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    public static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    public static multiply(v: Vector, scalar: number): Vector {
        return new Vector(v.x * scalar, v.y * scalar);
    }

    public static divide(v: Vector, scalar: number): Vector {
        if (scalar === 0) throw new Error("Cannot divide by zero");

        return new Vector(v.x / scalar, v.y / scalar);
    }

    public static transform(v: Vector, transform: Transform) {
        return new Vector(
            transform.cos * v.x - transform.sin * v.y + transform.position.x,
            transform.sin * v.x + transform.cos * v.y + transform.position.y);
    }

    public static getPerpendicular(v: Vector): Vector {
        return new Vector(-v.y, v.x);
    }
}

export default Vector;