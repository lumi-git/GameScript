import type p5 from "p5";
import type { GameObject } from "../GameObject";
import { drawComponent } from "../drawComponent";
import type { Camera } from "../Camera";

export class DrawElipseComponent extends drawComponent {
    constructor(parent: GameObject, color: string) {
        super(parent);
        this.color = color;
    }

    draw(p: p5, camera: Camera) {
        p.fill(this.color);
        p.ellipseMode(p.CORNER);
        p.ellipse(this.getParent().getTransform().getPosition().getX() - camera.getTransform().getPosition().getX(), this.getParent().getTransform().getPosition().getY() - camera.getTransform().getPosition().getY(), this.getParent().getTransform().getScale().getX(), this.getParent().getTransform().getScale().getY());
    }
}
