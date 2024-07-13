import { ColliderComponent } from "../gamescript/Components/ColliderComponent";
import { DrawElipseComponent } from "../gamescript/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "../gamescript/Components/DrawRectangleComponent";
import { DrawTextComponent } from "../gamescript/Components/DrawTextComponent";
import { PlayerMovementComponent } from "../gamescript/Components/PlayerMovementComponent";
import { Game } from "../gamescript/Game";
import { GameObject } from "../gamescript/GameObject";
import { Vector2 } from "../gamescript/Vector2";

export class MyEnemy extends GameObject{
    spawnPosition:Vector2 = new Vector2(0,0);
    constructor(randomVector:Vector2) {
        super();
        this.spawnPosition = randomVector;
        this.setTag("Enemy");
    }

    start() {
        console.log("Hello from new enemy GameObject");
        this.getTransform().setPosition(this.spawnPosition);
        this.getTransform().setScale(new Vector2(50,50));
        this.addDrawComponent(new DrawRectangleComponent(this, "red"));
        var tagComponent:DrawTextComponent = new DrawTextComponent(this);
        tagComponent.setText("Grrrrr");
        tagComponent.setSize(25);
        tagComponent.setColor("red");
        this.addDrawComponent( tagComponent)
        this.addColliderComponent(new ColliderComponent(this));
    }

    update(p: import("p5"), dt: number): void {
        super.update(p, dt);
        var player = Game.getInstance().getScene().getObjectsByTag("Player")[0];
        if(player){
            var direction = player.getTransform().getPosition().sub(this.getTransform().getPosition());
            direction.normalize();
            direction.selfScalMul(0.01);

            this.getTransform().setPosition(this.getTransform().getPosition().add(direction));
        }
    }
}