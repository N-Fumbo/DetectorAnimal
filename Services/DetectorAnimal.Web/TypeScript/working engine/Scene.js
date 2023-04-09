"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creationOfBaseObjects_1 = __importDefault(require("./creationOfBaseObjects"));
const Engine_1 = __importDefault(require("../engine/Engine"));
const SizeScreen_1 = __importDefault(require("./SizeScreen"));
class Scene {
    constructor(isWorkingEngine) {
        this.engine = new Engine_1.default();
        this.engine = new Engine_1.default();
        this.view = document.createElement('canvas');
        let context = this.view.getContext('2d');
        if (!context) {
            throw new Error('Unable to get 2D context.');
        }
        this.context = context;
        this.isWorkingEngine = isWorkingEngine;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.body.append(this.view);
    }
    getSizeScene() {
        return { width: this.view.width, height: this.view.height };
    }
    setSizeScene(size) {
        this.view.width = size.width;
        this.view.height = size.height;
    }
    draw() {
        this.engine.objects.forEach(object => {
            object.draw(this.context);
        });
    }
    clear() {
        this.context.clearRect(0, 0, this.view.width, this.view.height);
    }
    update(time, iterations) {
        this.engine.update(time, iterations);
    }
    add(...items) {
        this.engine.addObjects(...items);
    }
    remove(...items) {
        this.engine.removeObjects(...items);
    }
    resize() {
        const currentIsWorkingEngine = this.isWorkingEngine;
        this.isWorkingEngine = false;
        const sizeScreen = SizeScreen_1.default.getSizeScreen();
        this.view.width = sizeScreen.width;
        this.view.height = sizeScreen.height;
        this.engine.objects = [];
        this.creationBaseObjects();
        this.isWorkingEngine = currentIsWorkingEngine;
    }
    creationBaseObjects() {
        this.engine.addObjects(...(0, creationOfBaseObjects_1.default)(this.getSizeScene()));
    }
}
exports.default = Scene;
