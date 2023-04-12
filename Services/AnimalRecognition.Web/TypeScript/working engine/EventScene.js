"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../engine/math objects/Vector"));
const geometry_1 = require("../engine/math/geometry");
class EventScene {
    constructor(scene) {
        this.capturedObject = null;
        this.lastCursorPosition = null;
        this.startClick = null;
        this.scene = scene;
    }
    down(e) {
        this.startClick = performance.now();
        const cursorPosition = EventScene.getCursorPosition(e, this.scene.view.getBoundingClientRect());
        this.capturedObject = EventScene.findCapturedObject(cursorPosition, this.scene.engine.objects);
        if (this.capturedObject !== null) {
            this.capturedObject.velocity = Vector_1.default.zero();
            this.capturedObject.isCloseGravity = true;
        }
    }
    up(e) {
        if (this.capturedObject !== null) {
            const cursorPosition = EventScene.getCursorPosition(e, this.scene.view.getBoundingClientRect());
            if (this.startClick !== null && performance.now() - this.startClick < 150 && (0, geometry_1.isContainsPointInObject)(cursorPosition, this.capturedObject)) {
                this.capturedObject.executeEvent('click');
            }
            this.capturedObject.isCloseGravity = false;
            this.capturedObject = null;
        }
    }
    move(e, isMobile) {
        const cursorPosition = EventScene.getCursorPosition(e, this.scene.view.getBoundingClientRect());
        if (this.capturedObject !== null) {
            this.capturedObject.velocity = this.lastCursorPosition !== null ? Vector_1.default.multiply(Vector_1.default.subtract(cursorPosition, this.lastCursorPosition), 30) : Vector_1.default.zero();
        }
        else if (!isMobile) {
            this.scene.view.style.cursor = EventScene.findCapturedObject(cursorPosition, this.scene.engine.objects) !== null ? 'pointer' : 'default';
        }
        this.lastCursorPosition = cursorPosition;
    }
    outside() {
        if (this.capturedObject !== null) {
            this.capturedObject.isCloseGravity = false;
            this.capturedObject = null;
        }
    }
    static getCursorPosition(e, rectCanvas) {
        if (e instanceof TouchEvent) {
            const touch = e.touches[0] || e.changedTouches[0];
            return new Vector_1.default(touch.clientX - rectCanvas.left, touch.clientY - rectCanvas.top);
        }
        else {
            return new Vector_1.default(e.clientX - rectCanvas.left, e.clientY - rectCanvas.top);
        }
    }
    static findCapturedObject(cursorPosition, objects) {
        let result = null;
        objects.forEach(object => {
            if ((0, geometry_1.isContainsPointInObject)(cursorPosition, object)) {
                result = object;
                return;
            }
        });
        return result;
    }
}
exports.default = EventScene;
