"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContainsPointInObject = exports.findClosestPointOnRectangle = exports.getAxisDepth = exports.projectRectangle = exports.projectCircle = void 0;
const Vector_1 = __importDefault(require("../math objects/Vector"));
const MathVector_1 = __importDefault(require("../math/MathVector"));
const Circle_1 = __importDefault(require("../objects/Circle"));
const Rectangle_1 = __importDefault(require("../objects/Rectangle"));
const projectRectangle = (vertices, axis) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < vertices.length; i++) {
        let v = vertices[i];
        let dot = MathVector_1.default.dotProduct(v, axis);
        if (dot < min)
            min = dot;
        if (dot > max)
            max = dot;
    }
    return { min, max };
};
exports.projectRectangle = projectRectangle;
const projectCircle = (center, radius, axis) => {
    const direction = MathVector_1.default.normalize(axis);
    const directionAndRadius = Vector_1.default.multiply(direction, radius);
    const p1 = Vector_1.default.add(center, directionAndRadius);
    const p2 = Vector_1.default.subtract(center, directionAndRadius);
    let [min, max] = [MathVector_1.default.dotProduct(p1, axis), MathVector_1.default.dotProduct(p2, axis)];
    if (min > max)
        [min, max] = [max, min];
    return { min, max };
};
exports.projectCircle = projectCircle;
const getAxisDepth = (projectA, projectB) => {
    if (projectA.min >= projectB.max || projectB.min >= projectA.max)
        return null;
    return Math.min(projectB.max - projectA.min, projectA.max - projectB.min);
};
exports.getAxisDepth = getAxisDepth;
const findClosestPointOnRectangle = (circleCenter, vertices) => {
    let result = null;
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const distance = MathVector_1.default.distance(v, circleCenter);
        if (distance < minDistance) {
            minDistance = distance;
            result = vertices[i];
        }
    }
    return result;
};
exports.findClosestPointOnRectangle = findClosestPointOnRectangle;
function isContainsPointInObject(point, object) {
    if (object instanceof Rectangle_1.default) {
        const vertices = object.getTransformVertices();
        let intersections = 0;
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const v1 = vertices[i];
            const v2 = vertices[j];
            if ((v1.y > point.y) !== (v2.y > point.y) && (point.x < (v2.x - v1.x) * (point.y - v1.y) / (v2.y - v1.y) + v1.x))
                intersections++;
        }
        return intersections % 2 === 1;
    }
    else if (object instanceof Circle_1.default) {
        return MathVector_1.default.distanceSquared(point, object.center) <= object.radius ** 2;
    }
    else {
        throw new Error('unknown type style.');
    }
}
exports.isContainsPointInObject = isContainsPointInObject;
