import type p5 from "p5";
import { GameObject } from "../GameObject";
import { Vector2 } from "../Vector2";
import { Component } from "../Component";

export class InertiaFrictionComponent extends Component {
    velocity: Vector2;
    acceleration: Vector2;
    friction: number;
    constructor(parent:GameObject) {
        super(parent);
        this.velocity = new Vector2(0,0);
        this.acceleration = new Vector2(0,0);
        this.friction = 0.01;
    }

    update(p:p5,dt:number) {
        this.velocity.selfAdd(this.acceleration);
        this.velocity.selfScalMul(1-this.friction);
        this.getParent().getTransform().getPosition().add(this.velocity);
    }

    applyForce(force:Vector2){
        this.acceleration.selfAdd(force);
    }

    setFriction(friction:number){
        this.friction = friction;
    }

}