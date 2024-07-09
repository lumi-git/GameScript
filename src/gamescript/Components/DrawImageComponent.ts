import type p5 from "p5";
import type { GameObject } from "../GameObject";
import { drawComponent } from "../drawComponent";
import type { Camera } from "../Camera";

export class DrawImageComponent extends drawComponent {
    constructor(parent: GameObject) {
        super(parent);
    }

    draw(p: p5, camera: Camera) {
    }
}
