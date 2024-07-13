import { ColliderComponent } from "../gamescript/Components/ColliderComponent";
import { DrawElipseComponent } from "../gamescript/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "../gamescript/Components/DrawRectangleComponent";
import { DrawTextComponent } from "../gamescript/Components/DrawTextComponent";
import { PlayerMovementComponent } from "../gamescript/Components/PlayerMovementComponent";
import { RigidBodyComponent } from "../gamescript/Components/RigidBodyComponent";
import { Game } from "../gamescript/Game";
import { GameObject } from "../gamescript/GameObject";
import { Vector2 } from "../gamescript/Vector2";

export class MyEnemy extends GameObject{
    spawnPosition:Vector2 = new Vector2(0,0);
    gfx:DrawRectangleComponent;
    tagComponent:DrawTextComponent;
    constructor(randomVector:Vector2) {
        super();
        this.spawnPosition = randomVector;
        this.setTag("Enemy");
    }

    start() {
        console.log("Hello from new enemy GameObject");
        this.getTransform().setPosition(this.spawnPosition);
        this.getTransform().setScale(new Vector2(100,100));
        this.gfx = new DrawRectangleComponent(this, "red");
        this.addDrawComponent(this.gfx);
        this.tagComponent = new DrawTextComponent(this);
        this.tagComponent.setText("Grrrrr");
        this.tagComponent.setSize(25);
        this.tagComponent.setColor("red");
        this.addDrawComponent( this.tagComponent)
        this.addColliderComponent(new RigidBodyComponent(this));
    }

    update(p: import("p5"), dt: number): void {
        super.update(p, dt);
        var player = Game.getInstance().getScene().getObjectsByTag("Player")[0];
        if(player){
            var direction = player.getTransform().getPosition().sub(this.getTransform().getPosition());
            direction.selfScalMul(0.01);
            this.getTransform().setPosition(this.getTransform().getPosition().add(direction));
        }
    }

    onCollision(collider: ColliderComponent): void {
        // Change color and tag on collision
        this.gfx.setColor("green");
        this.tagComponent.setText("Grrrrr collided");
    }
    
    
    
    
}