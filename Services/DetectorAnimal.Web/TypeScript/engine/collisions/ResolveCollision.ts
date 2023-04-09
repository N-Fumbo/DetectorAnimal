import Vector from "../math objects/Vector";
import PhysicalObject from "../objects/base/PhysicalObject";
import { Manifold } from "./Manifold";
import MathVector from "../math/MathVector";

class ResolveCollision {
    private static readonly STATIC_FRICTION = 0.9;
    private static readonly DYNAMIC_FRICTION = 0.7;

    public static Resolve(manifold: Manifold): void {

        const objectA: PhysicalObject = manifold.objectA;
        const objectB: PhysicalObject = manifold.objectB;

        const normal: Vector = manifold.collisionData.normal;

        const contacts: Array<Vector> = manifold.contacts;

        const impulses: Array<Vector> = new Array(contacts.length);
        const frictionImpulses: Array<Vector> = new Array(contacts.length);

        const raList: Array<Vector> = new Array(contacts.length);
        const rbList: Array<Vector> = new Array(contacts.length);

        const jList: Array<number> = new Array(contacts.length);

        for (let i = 0; i < contacts.length; i++) {
            impulses[i] = frictionImpulses[i] = raList[i] = rbList[i] = Vector.zero();
            jList[i] = 0;
        }

        const e: number = Math.min(objectA.elasticity, objectB.elasticity);

        for (let i = 0; i < contacts.length; i++) {
            const ra: Vector = Vector.subtract(contacts[i], objectA.center);
            const rb: Vector = Vector.subtract(contacts[i], objectB.center);

            const relativeVelocity: Vector = this.getRelativeVelocity(objectA, objectB, ra, rb);

            const contactVelocityMag: number = MathVector.dotProduct(relativeVelocity, normal);

            if (contactVelocityMag > 0) continue;

            const raPerpDotN: number = MathVector.dotProduct(Vector.getPerpendicular(ra), normal);
            const rbPerpDotN: number = MathVector.dotProduct(Vector.getPerpendicular(rb), normal);

            const denom: number = objectA.invMass + objectB.invMass + (raPerpDotN ** 2) * objectA.invInertia + (rbPerpDotN ** 2) * objectB.invInertia;

            let j: number = (-(1 + e) * contactVelocityMag / denom) / contacts.length;

            const impulse: Vector = Vector.multiply(normal, j);

            jList[i] = j;
            raList[i] = ra;
            rbList[i] = rb;
            impulses[i] = impulse;
        }

        this.applyImpulse(objectA, objectB, impulses, raList, rbList);

        for (let i = 0; i < contacts.length; i++) {
            const relativeVelocity: Vector = this.getRelativeVelocity(objectA, objectB, raList[i], rbList[i]);

            let tangent: Vector = Vector.subtract(relativeVelocity, Vector.multiply(normal, MathVector.dotProduct(relativeVelocity, normal)));

            if (MathVector.vectorsNearlyEqual(tangent, Vector.zero())) continue;

            tangent = MathVector.normalize(tangent);

            const raPerpDotT: number = MathVector.dotProduct(Vector.getPerpendicular(raList[i]), tangent);
            const rbPerpDotT: number = MathVector.dotProduct(Vector.getPerpendicular(rbList[i]), tangent);

            const denom: number = objectA.invMass + objectB.invMass + (raPerpDotT ** 2) * objectA.invInertia + (rbPerpDotT ** 2) * objectB.invInertia;

            let jt: number = (-MathVector.dotProduct(relativeVelocity, tangent) / denom) / contacts.length;

            const j: number = jList[i];
            frictionImpulses[i] = Math.abs(jt) <= j * this.STATIC_FRICTION ? Vector.multiply(tangent, jt) : Vector.multiply(tangent, -j * this.DYNAMIC_FRICTION);
        }

        this.applyImpulse(objectA, objectB, frictionImpulses, raList, rbList);
    }

    private static getRelativeVelocity(objectA: PhysicalObject, objectB: PhysicalObject, ra: Vector, rb: Vector): Vector {

        const angularVelocityA = Vector.multiply(new Vector(-ra.y, ra.x), objectA.angularVelocity);
        const angularVelocityB = Vector.multiply(new Vector(-rb.y, rb.x), objectB.angularVelocity);

        return Vector.subtract(Vector.add(objectB.velocity, angularVelocityB), Vector.add(objectA.velocity, angularVelocityA));
    }

    private static applyImpulse(objectA: PhysicalObject, objectB: PhysicalObject, impulses: Array<Vector>, raList: Array<Vector>, rbList: Array<Vector>): void {
        for (let i = 0; i < impulses.length; i++) {
            const frictionImpulse = impulses[i];
            const ra = raList[i];
            const rb = rbList[i];

            objectA.velocity = Vector.add(objectA.velocity, Vector.multiply(Vector.reverse(frictionImpulse), objectA.invMass));

            objectA.angularVelocity += -MathVector.crossProduct(ra, frictionImpulse) * objectA.invInertia;

            objectB.velocity = Vector.add(objectB.velocity, Vector.multiply(frictionImpulse, objectB.invMass));

            objectB.angularVelocity += MathVector.crossProduct(rb, frictionImpulse) * objectB.invInertia;
        }
    }
}

export default ResolveCollision;