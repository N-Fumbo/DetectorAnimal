import Vector from "../math objects/Vector";

class MathVector {

    private static readonly equalityThreshold: number = 0.05;

    private static readonly equalityThresholdSquared: number = 0.0025;

    public static lengthVector(v: Vector): number {
        return Math.sqrt(this.lengthSquaredVector(v));
    }

    public static lengthSquaredVector(v: Vector): number {
        return v.x ** 2 + v.y ** 2;
    }

    public static distance(v1: Vector, v2: Vector): number {
        return Math.sqrt(this.distanceSquared(v1, v2));
    }

    public static distanceSquared(v1: Vector, v2: Vector): number {
        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        return dx * dx + dy * dy;
    }

    public static normalize(v: Vector): Vector {
        let length = this.lengthVector(v);
        return Vector.divide(v, length);
    }

    public static dotProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    public static crossProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.y - v1.y * v2.x;
    }

    public static nearlyEqual(a: number, b: number): boolean {
        return Math.abs(a - b) < this.equalityThreshold;
    }

    public static vectorsNearlyEqual(v1: Vector, v2: Vector): boolean {
        return this.distanceSquared(v1, v2) < this.equalityThresholdSquared;
    }
}

export default MathVector;