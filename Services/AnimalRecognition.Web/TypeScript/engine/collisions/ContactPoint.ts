import Vector from "../math objects/Vector";
import MathVector from "../math/MathVector";
import Circle from "../objects/Circle";
import Rectangle from "../objects/Rectangle";
import PhysicalObject from "../objects/base/PhysicalObject";

type PointSegmentDistance = {
    contact: Vector,
    distanceSquared: number
}

type PointsSegmentDistance = {
    contacts: Array<Vector>,
    distanceSquared: number
}

class ContactPoint {

    public static findContactPoints(objectA: PhysicalObject, objectB: PhysicalObject): Array<Vector> {
        if (objectA instanceof Rectangle && objectB instanceof Rectangle) {
            return this.findContactPointPolygon(objectA.getTransformVertices(), objectB.getTransformVertices());
        }
        else if (objectA instanceof Rectangle && objectB instanceof Circle) {
            return this.findContactPointCirclePolygon(objectB.center, objectA.getTransformVertices());
        }
        else if (objectA instanceof Circle && objectB instanceof Rectangle) {
            return this.findContactPointCirclePolygon(objectA.center, objectB.getTransformVertices());
        }
        else if (objectA instanceof Circle && objectB instanceof Circle) {
            return this.findContactPointCircles(objectA.center, objectA.radius, objectB.center);
        }
        else {
            throw new Error('unknown type of objectA and objectB');
        }
    }

    private static findContactPointPolygon(verticesA: Array<Vector>, verticesB: Array<Vector>) : Array<Vector> {
        let result: PointsSegmentDistance = {
            contacts: new Array<Vector>,
            distanceSquared: Number.MAX_VALUE
        }

        result = this.findContactPointInOnePolygon(verticesA, verticesB, result);

        result= this.findContactPointInOnePolygon(verticesB, verticesA, result);

        return result.contacts;
    }


    private static findContactPointCirclePolygon(circleCenter: Vector, vertices: Array<Vector>): Array<Vector> {
        let result: PointsSegmentDistance = {
            contacts: new Array<Vector>(),
            distanceSquared: Number.MAX_VALUE
        }

        for (let i = 0; i < vertices.length; i++) {
            const va = vertices[i];
            const vb = vertices[(i + 1) % vertices.length];

            const segment = this.getPointSegmentDistance(circleCenter, va, vb);

            if (segment.distanceSquared < result.distanceSquared) {
                result.distanceSquared = segment.distanceSquared;
                result.contacts[0] = segment.contact;
            }
        }

        return result.contacts;
    }

    private static findContactPointCircles(centerA: Vector, radiusA: number, centerB: Vector): Array<Vector> {
        let result: Array<Vector> = new Array<Vector>();

        const ab = Vector.subtract(centerB, centerA);
        const dir = MathVector.normalize(ab);
        result.push(Vector.add(centerA, Vector.multiply(dir, radiusA)));

        return result;
    }


    private static findContactPointInOnePolygon(verticesMain: Array<Vector>, verticesSecondary: Array<Vector>, segment: PointsSegmentDistance): PointsSegmentDistance {
        for (let i = 0; i < verticesMain.length; i++) {
            const p = verticesMain[i];

            for (let j = 0; j < verticesSecondary.length; j++) {
                const va = verticesSecondary[j];
                const vb = verticesSecondary[(j + 1) % verticesSecondary.length];

                const pointSegment = this.getPointSegmentDistance(p, va, vb);

                if (MathVector.nearlyEqual(pointSegment.distanceSquared, segment.distanceSquared)) {
                    if (!MathVector.vectorsNearlyEqual(pointSegment.contact, segment.contacts[0])) {
                        segment.contacts[1] = pointSegment.contact;
                    }
                }
                else if (pointSegment.distanceSquared < segment.distanceSquared) {
                    segment.distanceSquared = pointSegment.distanceSquared;
                    segment.contacts[0] = pointSegment.contact;
                }
            }
        }

        return segment;
    }

    private static getPointSegmentDistance(p: Vector, vectorA: Vector, vectorB: Vector): PointSegmentDistance {
        const ab: Vector = Vector.subtract(vectorB, vectorA);
        const ap: Vector = Vector.subtract(p, vectorA);

        const proj: number = MathVector.dotProduct(ap, ab);
        const abLenSq: number = MathVector.lengthSquaredVector(ab);

        const d: number = proj / abLenSq;

        let contact: Vector;

        if (d < 0) contact = vectorA;
        else if (d > 1) contact = vectorB;
        else contact = Vector.add(vectorA, Vector.multiply(ab, d));

        const distanceSquared: number = MathVector.distanceSquared(p, contact);

        return { contact, distanceSquared };
    }
}

export default ContactPoint;