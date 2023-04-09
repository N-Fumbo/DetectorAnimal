import Vector from "../math objects/Vector";
import PhysicalObject from "../objects/base/PhysicalObject";

type CollisionData = {
    normal: Vector,
    depth: number
} 

class Manifold {
    public readonly objectA: PhysicalObject;

    public readonly objectB: PhysicalObject;

    public readonly collisionData: CollisionData;

    public readonly contacts: Array<Vector>;

    constructor(objectA: PhysicalObject, objectB: PhysicalObject, collisionData: CollisionData, contacts: Array<Vector>) {
        this.objectA = objectA;
        this.objectB = objectB;
        this.collisionData = collisionData;
        this.contacts = contacts;
    }
}

export { Manifold, CollisionData};