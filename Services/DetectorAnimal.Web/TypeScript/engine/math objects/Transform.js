"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../math objects/Vector"));
class Transform {
    constructor(position, radian) {
        this.position = position;
        this.sin = Math.sin(radian);
        this.cos = Math.cos(radian);
    }
    static zero() {
        return new Transform(Vector_1.default.zero(), 0);
    }
}
exports.default = Transform;
