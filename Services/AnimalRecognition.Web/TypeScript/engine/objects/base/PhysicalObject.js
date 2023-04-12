"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../../math objects/Vector"));
const additional_1 = require("../../additional");
class PhysicalObject {
    constructor(center, radian, elasticity, density, isStatic) {
        this.center = center;
        this.radian = radian;
        this.density = density;
        this.isStatic = isStatic;
        this.isCloseGravity = false;
        this.velocity = Vector_1.default.zero();
        this.angularVelocity = 0;
        this.force = Vector_1.default.zero();
        this.elasticity = (0, additional_1.clamp)(elasticity, 0, 1);
    }
    move(vector) {
        this.center = Vector_1.default.add(this.center, vector);
    }
    moveTo(vector) {
        this.center = vector;
    }
    step(gravity, time) {
        if (this.isStatic)
            return;
        this.changeVelocity(gravity, time);
        this.center = Vector_1.default.add(this.center, Vector_1.default.multiply(this.velocity, time));
        this.radian += this.angularVelocity * time;
        this.force = Vector_1.default.zero();
    }
    changeVelocity(gravity, time) {
        let acceleration = Vector_1.default.divide(this.force, this.mass);
        this.velocity = Vector_1.default.add(this.velocity, acceleration);
        if (!this.isCloseGravity) {
            this.velocity = Vector_1.default.add(this.velocity, Vector_1.default.multiply(gravity, time));
        }
    }
}
exports.default = PhysicalObject;
