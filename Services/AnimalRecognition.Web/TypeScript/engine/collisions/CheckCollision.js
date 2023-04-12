"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../math objects/Vector"));
const MathVector_1 = __importDefault(require("../math/MathVector"));
const Circle_1 = __importDefault(require("../objects/Circle"));
const Rectangle_1 = __importDefault(require("../objects/Rectangle"));
const geometry_1 = require("../math/geometry");
class CheckCollision {
    static defineIntersection(objectA, objectB) {
        if (objectA instanceof Rectangle_1.default && objectB instanceof Rectangle_1.default) {
            return this.defineIntersectionRectangles(objectA, objectB);
        }
        else if (objectA instanceof Rectangle_1.default && objectB instanceof Circle_1.default) {
            let result = this.defineIntersectionRectangleAndCircle(objectA, objectB);
            if (result != null) {
                result.normal = Vector_1.default.reverse(result.normal);
                return result;
            }
        }
        else if (objectA instanceof Circle_1.default && objectB instanceof Rectangle_1.default) {
            return this.defineIntersectionRectangleAndCircle(objectB, objectA);
        }
        else if (objectA instanceof Circle_1.default && objectB instanceof Circle_1.default) {
            return this.defineIntersectionCircles(objectA, objectB);
        }
        else {
            throw new Error('unknown type of objectA and objectB');
        }
        return null;
    }
    static defineIntersectionByMask(a, b) {
        return !(a.max.x <= b.min.x || b.max.x <= a.min.x || a.max.y <= b.min.y || b.max.y <= a.min.y);
    }
    static defineIntersectionRectangles(objectA, objectB) {
        let result = this.findCollisionData(objectA, objectB, null);
        if (result != null) {
            result = this.findCollisionData(objectB, objectA, result);
            if (result != null) {
                const direction = Vector_1.default.subtract(objectB.center, objectA.center);
                if (MathVector_1.default.dotProduct(direction, result.normal) < 0) {
                    result.normal = Vector_1.default.reverse(result.normal);
                }
                return result;
            }
        }
        return null;
    }
    static defineIntersectionRectangleAndCircle(objectA, objectB) {
        const result = this.findCollisionData(objectA, objectB, null);
        const vertices = objectA.getTransformVertices();
        if (result != null) {
            const cp = (0, geometry_1.findClosestPointOnRectangle)(objectB.center, vertices);
            if (cp == null) {
                throw new Error('cp is null');
            }
            const axis = MathVector_1.default.normalize(Vector_1.default.subtract(cp, objectB.center));
            const axisDepth = (0, geometry_1.getAxisDepth)((0, geometry_1.projectRectangle)(vertices, axis), (0, geometry_1.projectCircle)(objectB.center, objectB.radius, axis));
            if (axisDepth == null)
                return null;
            if (axisDepth < result.depth) {
                result.depth = axisDepth;
                result.normal = axis;
            }
            const direction = Vector_1.default.subtract(objectA.center, objectB.center);
            if (MathVector_1.default.dotProduct(direction, result.normal) < 0) {
                result.normal = Vector_1.default.reverse(result.normal);
            }
            return result;
        }
        return null;
    }
    static defineIntersectionCircles(circleA, circleB) {
        const distance = MathVector_1.default.distance(circleA.center, circleB.center);
        const sumRadius = circleA.radius + circleB.radius;
        if (distance > sumRadius)
            return null;
        return {
            normal: MathVector_1.default.normalize(Vector_1.default.subtract(circleB.center, circleA.center)),
            depth: sumRadius - distance
        };
    }
    static findCollisionData(objectA, objectB, data) {
        let normal = data ? data.normal : Vector_1.default.zero();
        let depth = data ? data.depth : Number.MAX_VALUE;
        let verticesA = objectA.getTransformVertices();
        for (let i = 0; i < verticesA.length; i++) {
            const va = verticesA[i];
            const vb = verticesA[(i + 1) % verticesA.length];
            const edge = Vector_1.default.subtract(vb, va);
            const axis = MathVector_1.default.normalize(Vector_1.default.getPerpendicular(edge));
            const projectA = (0, geometry_1.projectRectangle)(verticesA, axis);
            let projectB;
            if (objectB instanceof Rectangle_1.default) {
                projectB = (0, geometry_1.projectRectangle)(objectB.getTransformVertices(), axis);
            }
            else if (objectB instanceof Circle_1.default) {
                projectB = (0, geometry_1.projectCircle)(objectB.center, objectB.radius, axis);
            }
            else {
                throw new Error('unknown type of objectB');
            }
            const axisDepth = (0, geometry_1.getAxisDepth)(projectA, projectB);
            if (axisDepth == null)
                return null;
            if (axisDepth < depth) {
                normal = axis;
                depth = axisDepth;
            }
        }
        return { normal, depth };
    }
}
exports.default = CheckCollision;
