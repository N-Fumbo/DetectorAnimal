"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../math objects/Vector"));
const MathVector_1 = __importDefault(require("../math/MathVector"));
class ResolveCollision {
    static Resolve(manifold) {
        const objectA = manifold.objectA;
        const objectB = manifold.objectB;
        const normal = manifold.collisionData.normal;
        const contacts = manifold.contacts;
        const impulses = new Array(contacts.length);
        const frictionImpulses = new Array(contacts.length);
        const raList = new Array(contacts.length);
        const rbList = new Array(contacts.length);
        const jList = new Array(contacts.length);
        for (let i = 0; i < contacts.length; i++) {
            impulses[i] = frictionImpulses[i] = raList[i] = rbList[i] = Vector_1.default.zero();
            jList[i] = 0;
        }
        const e = Math.min(objectA.elasticity, objectB.elasticity);
        for (let i = 0; i < contacts.length; i++) {
            const ra = Vector_1.default.subtract(contacts[i], objectA.center);
            const rb = Vector_1.default.subtract(contacts[i], objectB.center);
            const relativeVelocity = this.getRelativeVelocity(objectA, objectB, ra, rb);
            const contactVelocityMag = MathVector_1.default.dotProduct(relativeVelocity, normal);
            if (contactVelocityMag > 0)
                continue;
            const raPerpDotN = MathVector_1.default.dotProduct(Vector_1.default.getPerpendicular(ra), normal);
            const rbPerpDotN = MathVector_1.default.dotProduct(Vector_1.default.getPerpendicular(rb), normal);
            const denom = objectA.invMass + objectB.invMass + (raPerpDotN ** 2) * objectA.invInertia + (rbPerpDotN ** 2) * objectB.invInertia;
            let j = (-(1 + e) * contactVelocityMag / denom) / contacts.length;
            const impulse = Vector_1.default.multiply(normal, j);
            jList[i] = j;
            raList[i] = ra;
            rbList[i] = rb;
            impulses[i] = impulse;
        }
        this.applyImpulse(objectA, objectB, impulses, raList, rbList);
        for (let i = 0; i < contacts.length; i++) {
            const relativeVelocity = this.getRelativeVelocity(objectA, objectB, raList[i], rbList[i]);
            let tangent = Vector_1.default.subtract(relativeVelocity, Vector_1.default.multiply(normal, MathVector_1.default.dotProduct(relativeVelocity, normal)));
            if (MathVector_1.default.vectorsNearlyEqual(tangent, Vector_1.default.zero()))
                continue;
            tangent = MathVector_1.default.normalize(tangent);
            const raPerpDotT = MathVector_1.default.dotProduct(Vector_1.default.getPerpendicular(raList[i]), tangent);
            const rbPerpDotT = MathVector_1.default.dotProduct(Vector_1.default.getPerpendicular(rbList[i]), tangent);
            const denom = objectA.invMass + objectB.invMass + (raPerpDotT ** 2) * objectA.invInertia + (rbPerpDotT ** 2) * objectB.invInertia;
            let jt = (-MathVector_1.default.dotProduct(relativeVelocity, tangent) / denom) / contacts.length;
            const j = jList[i];
            frictionImpulses[i] = Math.abs(jt) <= j * this.STATIC_FRICTION ? Vector_1.default.multiply(tangent, jt) : Vector_1.default.multiply(tangent, -j * this.DYNAMIC_FRICTION);
        }
        this.applyImpulse(objectA, objectB, frictionImpulses, raList, rbList);
    }
    static getRelativeVelocity(objectA, objectB, ra, rb) {
        const angularVelocityA = Vector_1.default.multiply(new Vector_1.default(-ra.y, ra.x), objectA.angularVelocity);
        const angularVelocityB = Vector_1.default.multiply(new Vector_1.default(-rb.y, rb.x), objectB.angularVelocity);
        return Vector_1.default.subtract(Vector_1.default.add(objectB.velocity, angularVelocityB), Vector_1.default.add(objectA.velocity, angularVelocityA));
    }
    static applyImpulse(objectA, objectB, impulses, raList, rbList) {
        for (let i = 0; i < impulses.length; i++) {
            const frictionImpulse = impulses[i];
            const ra = raList[i];
            const rb = rbList[i];
            objectA.velocity = Vector_1.default.add(objectA.velocity, Vector_1.default.multiply(Vector_1.default.reverse(frictionImpulse), objectA.invMass));
            objectA.angularVelocity += -MathVector_1.default.crossProduct(ra, frictionImpulse) * objectA.invInertia;
            objectB.velocity = Vector_1.default.add(objectB.velocity, Vector_1.default.multiply(frictionImpulse, objectB.invMass));
            objectB.angularVelocity += MathVector_1.default.crossProduct(rb, frictionImpulse) * objectB.invInertia;
        }
    }
}
ResolveCollision.STATIC_FRICTION = 0.9;
ResolveCollision.DYNAMIC_FRICTION = 0.7;
exports.default = ResolveCollision;
