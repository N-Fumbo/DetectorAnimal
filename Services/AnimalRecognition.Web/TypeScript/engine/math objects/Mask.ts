import Vector from "../math objects/Vector";

class Mask {
    public min: Vector;
    public max: Vector;

    constructor(min: Vector, max: Vector) {
        this.min = min;
        this.max = max;
    }
}

export default Mask;