import type p5 from "p5";
import { Component } from "../Component";
import { Vector2 } from "../Vector2";
import type { GameObject } from "../GameObject";

export class InterpolationComponent extends Component {

    private interpolationSpeed: number; 

    constructor(parent: GameObject, interpolationSpeed: number = 0.1) {
        super(parent);
        this.interpolationSpeed = interpolationSpeed;
    }

    update(p: p5, dt: number) {
        const currentPosition = this.getParent().getTransform().getPosition();
        const futurePosition = this.getParent().getFutureTransform().getPosition();

        const interpolatedX = p.lerp(currentPosition.getX(), futurePosition.getX(), dt * this.interpolationSpeed);
        const interpolatedY = p.lerp(currentPosition.getY(), futurePosition.getY(), dt * this.interpolationSpeed);

        this.getParent().getTransform().getPosition().setX(interpolatedX);
        this.getParent().getTransform().getPosition().setY(interpolatedY);
    }
}