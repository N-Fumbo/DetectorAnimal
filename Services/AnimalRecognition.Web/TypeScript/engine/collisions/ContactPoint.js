"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("../math objects/Vector"));
const MathVector_1 = __importDefault(require("../math/MathVector"));
const Circle_1 = __importDefault(require("../objects/Circle"));
const Rectangle_1 = __importDefault(require("../objects/Rectangle"));
class ContactPoint {
    static findContactPoints(objectA, objectB) {
        if (objectA instanceof Rectangle_1.default && objectB instanceof Rectangle_1.default) {
            return this.findContactPointPolygon(objectA.getTransformVertices(), objectB.getTransformVertices());
        }
        else if (objectA instanceof Rectangle_1.default && objectB instanceof Circle_1.default) {
            return this.findContactPointCirclePolygon(objectB.center, objectA.getTransformVertices());
        }
        else if (objectA instanceof Circle_1.default && objectB instanceof Rectangle_1.default) {
            return this.findContactPointCirclePolygon(objectA.center, objectB.getTransformVertices());
        }
        else if (objectA instanceof Circle_1.default && objectB instanceof Circle_1.default) {
            return this.findContactPointCircles(objectA.center, objectA.radius, objectB.center);
        }
        else {
            throw new Error('unknown type of objectA and objectB');
        }
    }
    static findContactPointPolygon(verticesA, verticesB) {
        let result = {
            contacts: new Array,
            distanceSquared: Number.MAX_VALUE
        };
        result = this.findContactPointInOnePolygon(verticesA, verticesB, result);
        result = this.findContactPointInOnePolygon(verticesB, verticesA, result);
        return result.contacts;
    }
    static findContactPointCirclePolygon(circleCenter, vertices) {
        let result = {
            contacts: new Array(),
            distanceSquared: Number.MAX_VALUE
        };
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
    static findContactPointCircles(centerA, radiusA, centerB) {
        let result = new Array();
        const ab = Vector_1.default.subtract(centerB, centerA);
        const dir = MathVector_1.default.normalize(ab);
        result.push(Vector_1.default.add(centerA, Vector_1.default.multiply(dir, radiusA)));
        return result;
    }
    static findContactPointInOnePolygon(verticesMain, verticesSecondary, segment) {
        for (let i = 0; i < verticesMain.length; i++) {
            const p = verticesMain[i];
            for (let j = 0; j < verticesSecondary.length; j++) {
                const va = verticesSecondary[j];
                const vb = verticesSecondary[(j + 1) % verticesSecondary.length];
                const pointSegment = this.getPointSegmentDistance(p, va, vb);
                if (MathVector_1.default.nearlyEqual(pointSegment.distanceSquared, segment.distanceSquared)) {
                    if (!MathVector_1.default.vectorsNearlyEqual(pointSegment.contact, segment.contacts[0])) {
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
    static getPointSegmentDistance(p, vectorA, vectorB) {
        const ab = Vector_1.default.subtract(vectorB, vectorA);
        const ap = Vector_1.default.subtract(p, vectorA);
        const proj = MathVector_1.default.dotProduct(ap, ab);
        const abLenSq = MathVector_1.default.lengthSquaredVector(ab);
        const d = proj / abLenSq;
        let contact;
        if (d < 0)
            contact = vectorA;
        else if (d > 1)
            contact = vectorB;
        else
            contact = Vector_1.default.add(vectorA, Vector_1.default.multiply(ab, d));
        const distanceSquared = MathVector_1.default.distanceSquared(p, contact);
        return { contact, distanceSquared };
    }
}
exports.default = ContactPoint;
