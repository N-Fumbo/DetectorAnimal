"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static zero() {
        return new Vector(0, 0);
    }
    static reverse(v) {
        return new Vector(-v.x, -v.y);
    }
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static subtract(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static multiply(v, scalar) {
        return new Vector(v.x * scalar, v.y * scalar);
    }
    static divide(v, scalar) {
        if (scalar === 0)
            throw new Error("Cannot divide by zero");
        return new Vector(v.x / scalar, v.y / scalar);
    }
    static transform(v, transform) {
        return new Vector(transform.cos * v.x - transform.sin * v.y + transform.position.x, transform.sin * v.x + transform.cos * v.y + transform.position.y);
    }
    static getPerpendicular(v) {
        return new Vector(-v.y, v.x);
    }
}
exports.default = Vector;
