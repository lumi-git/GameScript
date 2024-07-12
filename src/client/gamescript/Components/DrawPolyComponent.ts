
import type p5 from "p5";
import type { Camera } from "../Camera";
import { drawComponent } from "../drawComponent";

export class DrawPolyComponent extends drawComponent {

    private points: any;

    constructor(parent: any, points: any, color: string) {
        super(parent);
        this.points = points;
        this.color = color;
    }

    draw(p: p5, camera: Camera) {
        p.fill(this.color);
        p.beginShape();
        for (let i = 0; i < this.points.length; i++) {
            p.vertex(this.points[i].getX() + this.getParent().getTransform().getPosition().getX() - camera.getTransform().getPosition().getX(), this.points[i].getY() + this.getParent().getTransform().getPosition().getY() - camera.getTransform().getPosition().getY());
        }
        p.endShape(p.CLOSE);
    }


}