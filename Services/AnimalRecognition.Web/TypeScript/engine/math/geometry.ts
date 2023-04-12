import Transform from "../math objects/Transform";
import Vector from "../math objects/Vector";
import MathVector from "../math/MathVector";
import Circle from "../objects/Circle";
import Rectangle from "../objects/Rectangle";
import PhysicalObject from "../objects/base/PhysicalObject";

const projectRectangle = (vertices: Array<Vector>, axis: Vector): { min: number, max: number } => {
    let min: number = Number.MAX_VALUE;
    let max: number = Number.MIN_VALUE;

    for (let i = 0; i < vertices.length; i++) {
        let v: Vector = vertices[i];
        let dot: number = MathVector.dotProduct(v, axis);

        if (dot < min) min = dot;
        if (dot > max) max = dot;
    }

    return { min, max };
}

const projectCircle = (center: Vector, radius: number, axis: Vector): { min: number, max: number } => {
    const direction: Vector = MathVector.normalize(axis);

    const directionAndRadius: Vector = Vector.multiply(direction, radius);

    const p1: Vector = Vector.add(center, directionAndRadius);
    const p2: Vector = Vector.subtract(center, directionAndRadius);

    let [min, max] = [MathVector.dotProduct(p1, axis), MathVector.dotProduct(p2, axis)];

    if (min > max) [min, max] = [max, min];

    return { min, max };
}


const getAxisDepth = (projectA: { min: number, max: number }, projectB: { min: number, max: number }): number | null => {
    if (projectA.min >= projectB.max || projectB.min >= projectA.max) return null;

    return Math.min(projectB.max - projectA.min, projectA.max - projectB.min);
}

const findClosestPointOnRectangle = (circleCenter: Vector, vertices: Array<Vector>): Vector | null => {
    let result: Vector | null = null;
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        const distance = MathVector.distance(v, circleCenter);

        if (distance < minDistance) {
            minDistance = distance;
            result = vertices[i];
        }
    }

    return result;
}

function isContainsPointInObject(point: Vector, object: PhysicalObject): boolean {
    if (object instanceof Rectangle) {

        const vertices: Array<Vector> = object.getTransformVertices();
        let intersections: number = 0;

        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const v1: Vector = vertices[i];
            const v2: Vector = vertices[j];

            if ((v1.y > point.y) !== (v2.y > point.y) && (point.x < (v2.x - v1.x) * (point.y - v1.y) / (v2.y - v1.y) + v1.x))
                intersections++;
        }

        return intersections % 2 === 1;
    }
    else if (object instanceof Circle) {
        return MathVector.distanceSquared(point, object.center) <= object.radius ** 2;
    }
    else {
        throw new Error('unknown type style.');
    }
}

export { projectCircle, projectRectangle, getAxisDepth, findClosestPointOnRectangle, isContainsPointInObject };