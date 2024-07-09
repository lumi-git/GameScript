import { GameObject } from "./GameObject";
import { Transform } from "./Transform";

export class Camera {
    transform: Transform;
    constructor() {
        this.transform = new Transform(0, 0, 0, 0);
    }

    getTransform(): Transform {
        return this.transform;
    }

}
