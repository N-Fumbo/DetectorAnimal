import Mask from "./math objects/Mask";
import Vector from "./math objects/Vector";
import PhysicalObject from "./objects/base/PhysicalObject";
import CheckCollision from "./collisions/CheckCollision";
import { CollisionData } from "./collisions/Manifold";
import ContactPoint from "./collisions/ContactPoint";
import { Manifold } from "./collisions/Manifold";
import ResolveCollision from "./collisions/ResolveCollision";
import GeometricObject from "./objects/base/GeometricObject";

class Engine {

    public objects: Array<GeometricObject>;

    private readonly GRAVITY: Vector = new Vector(0, 981);

    private contactsPairs: Array<{ objectA: PhysicalObject, objectB: PhysicalObject }>;

    public contactPoints: Array<Array<Vector>>;

    constructor() {
        this.objects = new Array<GeometricObject>();
        this.contactsPairs = new Array();
        this.contactPoints = [];
    }

    public addObjects(...objects: Array<GeometricObject>): void {
        objects.forEach((object) => {
            if (!this.objects.includes(object)) {
                this.objects.push(object);
            }
        });
    }

    public removeObjects(...objects: Array<GeometricObject>): void {
        objects.forEach((object) => {
            if (this.objects.includes(object)) {
                let index = this.objects.indexOf(object);
                this.objects.splice(index, 1);
            }
        });
    }

    public update(time: number, iterations: number): void {
        this.contactPoints = [];
        this.collisionHandling();

        time /= iterations;
        this.objects.forEach((object) => {
            object.step(this.GRAVITY, time);
        });
    }

    private collisionHandling(): void {
        this.contactsPairs = [];

        this.broadPhase();
        this.narrowPhase();
    }

    private broadPhase(): void {
        for (let i = 0; i < this.objects.length - 1; i++) {
            let objectA: PhysicalObject = this.objects[i];

            let maskA: Mask = objectA.getMask();

            for (let j = i + 1; j < this.objects.length; j++) {
                let objectB: PhysicalObject = this.objects[j];

                if (objectA.isStatic && objectB.isStatic) continue;

                let maskB: Mask = objectB.getMask();

                if (CheckCollision.defineIntersectionByMask(maskA, maskB)) {
                    this.contactsPairs.push({ objectA, objectB });
                }
            }
        }
    }

    private narrowPhase() {
        this.contactsPairs.forEach((pair) => {
            const objectA: PhysicalObject = pair.objectA;
            const objectB: PhysicalObject = pair.objectB;

            const dataCollision: CollisionData | null = CheckCollision.defineIntersection(objectA, objectB);

            if (dataCollision != null) {
                this.repulsion(objectA, objectB, dataCollision);

                const contactPoints: Array<Vector> = ContactPoint.findContactPoints(objectA, objectB);

                this.contactPoints.push(contactPoints);

                const manifold: Manifold = new Manifold(objectA, objectB, dataCollision, contactPoints);

                ResolveCollision.Resolve(manifold);
            }
        });
    }

    private repulsion(objectA: PhysicalObject, objectB: PhysicalObject, dataCollision: CollisionData): void {
        if (objectA.isStatic) {
            objectB.move(Vector.multiply(dataCollision.normal, dataCollision.depth));
        }
        else if (objectB.isStatic) {
            objectA.move(Vector.multiply(Vector.reverse(dataCollision.normal), dataCollision.depth));
        }
        else {
            const halfDepth = dataCollision.depth / 2;
            objectA.move(Vector.multiply(Vector.reverse(dataCollision.normal), halfDepth));
            objectB.move(Vector.multiply(dataCollision.normal, halfDepth));
        }
    }

}

export default Engine;