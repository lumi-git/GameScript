import { Component } from "./Component";
import { DrawRectangleComponent } from "./Components/DrawRectangleComponent";
import { DrawTextComponent } from "./Components/DrawTextComponent";
import { PlayerMovementComponent } from "./Components/PlayerMovementComponent";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class defaultGameObject extends GameObject{

    constructor() {
        super();
    }

    start() {
        console.log("Hello from default GameObject");
        this.getTransform().setPosition(new Vector2(100,100));
        this.getTransform().setScale(new Vector2(50,50));
        this.addComponent(new PlayerMovementComponent(this, 5));
        this.addDrawComponent(new DrawRectangleComponent(this, "red"));
        var tagComponent:DrawTextComponent = new DrawTextComponent(this);
        tagComponent.setText("move with the arrows :p");
        this.addDrawComponent( tagComponent)
    }
}