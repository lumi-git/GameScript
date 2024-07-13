import { ColliderComponent } from "../gamescript/Components/ColliderComponent";
import { DrawElipseComponent } from "../gamescript/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "../gamescript/Components/DrawRectangleComponent";
import { DrawTextComponent } from "../gamescript/Components/DrawTextComponent";
import { PlayerMovementComponent } from "../gamescript/Components/PlayerMovementComponent";
import { Game } from "../gamescript/Game";
import { GameObject } from "../gamescript/GameObject";
import { Vector2 } from "../gamescript/Vector2";

export class MyWall extends GameObject{
    spawnPosition:Vector2;
    constructor(spawnPosition:Vector2) {
        super();
        this.spawnPosition = spawnPosition;

        this.setTag("Wall");
    }

    start() {
        console.log("Hello from new enemy GameObject");
        this.getTransform().setPosition(this.spawnPosition);
        this.getTransform().setScale(new Vector2(50,50));
        this.addDrawComponent(new DrawRectangleComponent(this, "white"));
        this.addColliderComponent(new ColliderComponent(this));
    }

}