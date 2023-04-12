"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = __importDefault(require("./Scene"));
const EventScene_1 = __importDefault(require("./EventScene"));
const InitObjectUserNotAurhorized_1 = __importDefault(require("./init objects/InitObjectUserNotAurhorized"));
const InitObjectUserAurhorized_1 = __importDefault(require("./init objects/InitObjectUserAurhorized"));
const working = (isUserAuthorized) => {
    const initObject = isUserAuthorized ? new InitObjectUserAurhorized_1.default() : new InitObjectUserNotAurhorized_1.default();
    const scene = new Scene_1.default(isUserAuthorized, initObject);
    const eventScene = new EventScene_1.default(scene);
    if ('ontouchstart' in window) {
        scene.view.addEventListener('touchstart', (e) => eventScene.down(e));
        scene.view.addEventListener('touchend', (e) => eventScene.up(e));
        scene.view.addEventListener('touchmove', (e) => eventScene.move(e, true));
    }
    else {
        scene.view.addEventListener('mousedown', (e) => eventScene.down(e));
        scene.view.addEventListener('mouseup', (e) => eventScene.up(e));
        scene.view.addEventListener('mousemove', (e) => eventScene.move(e, false));
        scene.view.addEventListener('mouseleave', () => eventScene.outside());
    }
    const iterations = 20;
    let lastTimestamp = performance.now();
    const tick = (timestamp) => {
        const elapsedTime = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;
        for (let i = 0; i < iterations; i++) {
            if (scene.isWorkingEngine) {
                scene.update(elapsedTime, iterations);
            }
        }
        scene.clear();
        scene.draw();
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
exports.default = working;
