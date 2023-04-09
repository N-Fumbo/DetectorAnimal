"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manifold = void 0;
class Manifold {
    constructor(objectA, objectB, collisionData, contacts) {
        this.objectA = objectA;
        this.objectB = objectB;
        this.collisionData = collisionData;
        this.contacts = contacts;
    }
}
exports.Manifold = Manifold;
