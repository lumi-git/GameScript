import type p5 from "p5";
import { Component } from "../Component";
import type { GameObject } from "../GameObject";
import { Vector2 } from "../Vector2";
import { Game } from "../Game";

export class PlayerMovementMouseComponent extends Component {
    speed: number;
    constructor(parent: GameObject, speed: number) {
        super(parent);
        this.speed = speed;
    }
    
    update(p:p5,dt:number) {
        var scaledSpeed = this.speed * dt;
        var amountToMove:Vector2;
        amountToMove = Game.getInstance().getMousePosition().copy();
        amountToMove.selfSub( new Vector2 (this.getParent().getTransform().getPosition().getX(), this.getParent().getTransform().getPosition().getY()));
        amountToMove.selfNormalize();
        amountToMove.selfScalMul(scaledSpeed);
        this.getParent().move( this.getParent().getTransform().getPosition().add(amountToMove));
    }
}