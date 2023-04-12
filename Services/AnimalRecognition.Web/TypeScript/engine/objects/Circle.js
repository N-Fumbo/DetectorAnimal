"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mask_1 = __importDefault(require("../math objects/Mask"));
const Vector_1 = __importDefault(require("../math objects/Vector"));
const GeometricObject_1 = __importDefault(require("./base/GeometricObject"));
class Circle extends GeometricObject_1.default {
    constructor(center, radius, style, radian = 0, elasticity = 0.6, density = 1, isStatic = false) {
        super(center, radian, elasticity, density, isStatic);
        this.radius = radius;
        this.area = this.radius ** 2 * Math.PI;
        if (!this.isStatic) {
            this.mass = this.area * this.density;
            this.inertia = 0.5 * this.mass * this.radius ** 2;
            this.invMass = 1 / this.mass;
            this.invInertia = 1 / this.inertia;
        }
        else {
            this.mass = this.inertia = this.invMass = this.invInertia = 0;
        }
        this.style = style;
    }
    getMask() {
        let min = new Vector_1.default(this.center.x - this.radius, this.center.y - this.radius);
        let max = new Vector_1.default(this.center.x + this.radius, this.center.y + this.radius);
        return new Mask_1.default(min, max);
    }
    draw(context) {
        if (this.style) {
            this.style.draw(context, { center: this.center, radius: this.radius, radian: this.radian });
        }
    }
}
exports.default = Circle;
