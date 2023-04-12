import Mask from "../math objects/Mask";
import Vector from "../math objects/Vector";
import MathVector from "../math/MathVector";
import PhysicalObject from "../objects/base/PhysicalObject";
import Circle from "../objects/Circle";
import Rectangle from "../objects/Rectangle";
import { projectRectangle, projectCircle, getAxisDepth, findClosestPointOnRectangle } from "../math/geometry";
import { CollisionData } from "./Manifold";


class CheckCollision {

    public static defineIntersection(objectA: PhysicalObject, objectB: PhysicalObject): CollisionData | null {
        if (objectA instanceof Rectangle && objectB instanceof Rectangle) {
            return this.defineIntersectionRectangles(objectA, objectB);
        }
        else if (objectA instanceof Rectangle && objectB instanceof Circle) {
            let result = this.defineIntersectionRectangleAndCircle(objectA, objectB);
            if (result != null) {
                result.normal = Vector.reverse(result.normal);
                return result;
            }
        }
        else if (objectA instanceof Circle && objectB instanceof Rectangle) {
            return this.defineIntersectionRectangleAndCircle(objectB, objectA);
        }
        else if (objectA instanceof Circle && objectB instanceof Circle) {
            return this.defineIntersectionCircles(objectA, objectB);
        }
        else {
            throw new Error('unknown type of objectA and objectB');
        }

        return null;
    }

    public static defineIntersectionByMask(a: Mask, b: Mask): boolean {
        return !(a.max.x <= b.min.x || b.max.x <= a.min.x || a.max.y <= b.min.y || b.max.y <= a.min.y);
    }

    private static defineIntersectionRectangles(objectA: Rectangle, objectB: Rectangle): CollisionData | null {
        let result: CollisionData | null = this.findCollisionData(objectA, objectB, null);
        if (result != null) {
            result = this.findCollisionData(objectB, objectA, result);

            if (result != null) {
                const direction: Vector = Vector.subtract(objectB.center, objectA.center);

                if (MathVector.dotProduct(direction, result.normal) < 0) {
                    result.normal = Vector.reverse(result.normal);
                }

                return result;
            }
        }

        return null;
    }

    private static defineIntersectionRectangleAndCircle(objectA: Rectangle, objectB: Circle): CollisionData | null {
        const result = this.findCollisionData(objectA, objectB, null);
        const vertices: Array<Vector> = objectA.getTransformVertices();

        if (result != null) {
            const cp: Vector | null = findClosestPointOnRectangle(objectB.center, vertices);
            if (cp == null) {
                throw new Error('cp is null');
            }

            const axis = MathVector.normalize(Vector.subtract(cp, objectB.center));

            const axisDepth: number | null = getAxisDepth(
                projectRectangle(vertices, axis),
                projectCircle(objectB.center, objectB.radius, axis)
            )

            if (axisDepth == null) return null;

            if (axisDepth < result.depth) {
                result.depth = axisDepth;
                result.normal = axis;
            }

            const direction = Vector.subtract(objectA.center, objectB.center);

            if (MathVector.dotProduct(direction, result.normal) < 0) {
                result.normal = Vector.reverse(result.normal);
            }

            return result;
        }

        return null;
    }

    private static defineIntersectionCircles(circleA: Circle, circleB: Circle): CollisionData | null {
        const distance: number = MathVector.distance(circleA.center, circleB.center);

        const sumRadius = circleA.radius + circleB.radius;

        if (distance > sumRadius) return null;

        return {
            normal: MathVector.normalize(Vector.subtract(circleB.center, circleA.center)),
            depth: sumRadius - distance
        }
    }

    private static findCollisionData(objectA: Rectangle, objectB: PhysicalObject, data: CollisionData | null): CollisionData | null {
        let normal: Vector = data ? data.normal : Vector.zero();
        let depth: number = data ? data.depth : Number.MAX_VALUE;

        let verticesA: Array<Vector> = objectA.getTransformVertices();

        for (let i = 0; i < verticesA.length; i++) {
            const va = verticesA[i];
            const vb: Vector = verticesA[(i + 1) % verticesA.length];

            const edge: Vector = Vector.subtract(vb, va);

            const axis: Vector = MathVector.normalize(Vector.getPerpendicular(edge));

            const projectA: { min: number, max: number } = projectRectangle(verticesA, axis);

            let projectB: { min: number, max: number };
            if (objectB instanceof Rectangle) {
                projectB = projectRectangle(objectB.getTransformVertices(), axis);
            }
            else if (objectB instanceof Circle) {
                projectB = projectCircle(objectB.center, objectB.radius, axis);
            }
            else {
                throw new Error('unknown type of objectB');
            }

            const axisDepth: number | null = getAxisDepth(projectA, projectB);

            if (axisDepth == null) return null;

            if (axisDepth < depth) {
                normal = axis;
                depth = axisDepth;
            }
        }

        return { normal, depth };
    }
}

export default CheckCollision;