"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mask_1 = __importDefault(require("../math objects/Mask"));
const Vector_1 = __importDefault(require("../math objects/Vector"));
const Transform_1 = __importDefault(require("../math objects/Transform"));
const GeometricObject_1 = __importDefault(require("./base/GeometricObject"));
class Rectangle extends GeometricObject_1.default {
    constructor(center, size, style, radian = 0, elasticity = 0.6, density = 1, isStatic = false) {
        super(center, radian, elasticity, density, isStatic);
        this.size = size;
        this.area = Math.abs(size.width) * Math.abs(size.height);
        if (!this.isStatic) {
            this.mass = this.area * this.density;
            this.inertia = (1 / 12) * this.mass * (this.size.width ** 2 + this.size.height ** 2);
            this.invMass = 1 / this.mass;
            this.invInertia = 1 / this.inertia;
        }
        else {
            this.mass = this.inertia = this.invMass = this.invInertia = 0;
        }
        this._vertices = this.getVertices();
        this._verticesTransform = this.getTransformVertices();
        this._isActualVerticesTransform = true;
        this.style = style;
    }
    step(gravity, time) {
        super.step(gravity, time);
        this._isActualVerticesTransform = false;
    }
    getMask() {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;
        const vertices = this.getTransformVertices();
        for (let i = 0; i < vertices.length; i++) {
            const v = vertices[i];
            if (v.x < minX)
                minX = v.x;
            if (v.x > maxX)
                maxX = v.x;
            if (v.y < minY)
                minY = v.y;
            if (v.y > maxY)
                maxY = v.y;
        }
        return new Mask_1.default(new Vector_1.default(minX, minY), new Vector_1.default(maxX, maxY));
    }
    getTransformVertices() {
        if (!this._isActualVerticesTransform) {
            const transform = new Transform_1.default(this.center, this.radian);
            this._verticesTransform = new Array(this._vertices.length);
            for (let i = 0; i < this._vertices.length; i++) {
                const vertex = this._vertices[i];
                this._verticesTransform[i] = Vector_1.default.transform(vertex, transform);
            }
            this._isActualVerticesTransform = true;
        }
        return this._verticesTransform;
    }
    draw(context) {
        if (this.style) {
            this.style.draw(context, { center: this.center, size: this.size, radian: this.radian });
        }
    }
    getVertices() {
        const halfSize = { width: this.size.width / 2, height: this.size.height / 2 };
        return [
            new Vector_1.default(-halfSize.width, -halfSize.height),
            new Vector_1.default(halfSize.width, -halfSize.height),
            new Vector_1.default(halfSize.width, halfSize.height),
            new Vector_1.default(-halfSize.width, halfSize.height),
        ];
    }
}
exports.default = Rectangle;
