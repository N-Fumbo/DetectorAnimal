"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../math objects/Vector"));
class MathVector {
    static lengthVector(v) {
        return Math.sqrt(this.lengthSquaredVector(v));
    }
    static lengthSquaredVector(v) {
        return v.x ** 2 + v.y ** 2;
    }
    static distance(v1, v2) {
        return Math.sqrt(this.distanceSquared(v1, v2));
    }
    static distanceSquared(v1, v2) {
        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        return dx * dx + dy * dy;
    }
    static normalize(v) {
        let length = this.lengthVector(v);
        return Vector_1.default.divide(v, length);
    }
    static dotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static crossProduct(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    static nearlyEqual(a, b) {
        return Math.abs(a - b) < this.equalityThreshold;
    }
    static vectorsNearlyEqual(v1, v2) {
        return this.distanceSquared(v1, v2) < this.equalityThresholdSquared;
    }
}
MathVector.equalityThreshold = 0.05;
MathVector.equalityThresholdSquared = 0.0025;
exports.default = MathVector;
