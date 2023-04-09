"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PhysicalObject_1 = __importDefault(require("./PhysicalObject"));
class GeometricObject extends PhysicalObject_1.default {
    constructor() {
        super(...arguments);
        this.events = new Map;
    }
    addEvent(eventKey, callback) {
        if (!this.events.has(eventKey)) {
            this.events.set(eventKey, callback);
        }
    }
    removeEvent(eventKey) {
        if (this.events.has(eventKey)) {
            this.events.delete(eventKey);
        }
    }
    executeEvent(eventKey) {
        if (this.events.has(eventKey)) {
            const callback = this.events.get(eventKey);
            if (callback !== undefined) {
                callback();
            }
        }
    }
}
exports.default = GeometricObject;
