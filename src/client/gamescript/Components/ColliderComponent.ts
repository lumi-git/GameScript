import type p5 from "p5";
import { Component } from "../Component";
import { Game } from "../Game";
import type { GameObject } from "../GameObject";

export class ColliderComponent extends Component {
    constructor(parent:GameObject) {
        super(parent);
    }
    
    update(p:p5,dt:number) {
        Game.getInstance().getCollisionSystem().insert(this);
    }

    MonCollisionEnter(collider:ColliderComponent) {
        this.getParent().MonCollision(collider);
    }

}