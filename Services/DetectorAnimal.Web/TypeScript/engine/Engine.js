"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("./math objects/Vector"));
const CheckCollision_1 = __importDefault(require("./collisions/CheckCollision"));
const ContactPoint_1 = __importDefault(require("./collisions/ContactPoint"));
const Manifold_1 = require("./collisions/Manifold");
const ResolveCollision_1 = __importDefault(require("./collisions/ResolveCollision"));
class Engine {
    constructor() {
        this.GRAVITY = new Vector_1.default(0, 981);
        this.objects = new Array();
        this.contactsPairs = new Array();
        this.contactPoints = [];
    }
    addObjects(...objects) {
        objects.forEach((object) => {
            if (!this.objects.includes(object)) {
                this.objects.push(object);
            }
        });
    }
    removeObjects(...objects) {
        objects.forEach((object) => {
            if (this.objects.includes(object)) {
                let index = this.objects.indexOf(object);
                this.objects.splice(index, 1);
            }
        });
    }
    update(time, iterations) {
        this.contactPoints = [];
        this.collisionHandling();
        time /= iterations;
        this.objects.forEach((object) => {
            object.step(this.GRAVITY, time);
        });
    }
    collisionHandling() {
        this.contactsPairs = [];
        this.broadPhase();
        this.narrowPhase();
    }
    broadPhase() {
        for (let i = 0; i < this.objects.length - 1; i++) {
            let objectA = this.objects[i];
            let maskA = objectA.getMask();
            for (let j = i + 1; j < this.objects.length; j++) {
                let objectB = this.objects[j];
                if (objectA.isStatic && objectB.isStatic)
                    continue;
                let maskB = objectB.getMask();
                if (CheckCollision_1.default.defineIntersectionByMask(maskA, maskB)) {
                    this.contactsPairs.push({ objectA, objectB });
                }
            }
        }
    }
    narrowPhase() {
        this.contactsPairs.forEach((pair) => {
            const objectA = pair.objectA;
            const objectB = pair.objectB;
            const dataCollision = CheckCollision_1.default.defineIntersection(objectA, objectB);
            if (dataCollision != null) {
                this.repulsion(objectA, objectB, dataCollision);
                const contactPoints = ContactPoint_1.default.findContactPoints(objectA, objectB);
                this.contactPoints.push(contactPoints);
                const manifold = new Manifold_1.Manifold(objectA, objectB, dataCollision, contactPoints);
                ResolveCollision_1.default.Resolve(manifold);
            }
        });
    }
    repulsion(objectA, objectB, dataCollision) {
        if (objectA.isStatic) {
            objectB.move(Vector_1.default.multiply(dataCollision.normal, dataCollision.depth));
        }
        else if (objectB.isStatic) {
            objectA.move(Vector_1.default.multiply(Vector_1.default.reverse(dataCollision.normal), dataCollision.depth));
        }
        else {
            const halfDepth = dataCollision.depth / 2;
            objectA.move(Vector_1.default.multiply(Vector_1.default.reverse(dataCollision.normal), halfDepth));
            objectB.move(Vector_1.default.multiply(dataCollision.normal, halfDepth));
        }
    }
}
exports.default = Engine;
