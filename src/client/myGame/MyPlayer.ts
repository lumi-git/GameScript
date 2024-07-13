import { ColliderComponent } from "../gamescript/Components/ColliderComponent";
import { DrawElipseComponent } from "../gamescript/Components/DrawElipseComponent";
import { DrawTextComponent } from "../gamescript/Components/DrawTextComponent";
import { PlayerMovementComponent } from "../gamescript/Components/PlayerMovementComponent";
import { PlayerMovementMouseComponent } from "../gamescript/Components/PlayerMovementMouseComponent";
import { RigidBodyComponent } from "../gamescript/Components/RigidBodyComponent";
import { GameObject } from "../gamescript/GameObject";
import { Vector2 } from "../gamescript/Vector2";

export class MyPlayer extends GameObject{
    tagComponent:DrawTextComponent;
    enemyDefeated:number = 0;
    terrain:GameObject;
    constructor(terrain:GameObject) {
        super();
        this.terrain = terrain;
        this.setTag("Player");
        this.attachCamera();
    }

    start() {
        console.log("Hello from default GameObject");
        this.getTransform().setPosition(new Vector2(1000,1000));
        this.getTransform().setScale(new Vector2(100,100));
        this.addDrawComponent(new DrawElipseComponent(this, "blue"));
        this.tagComponent = new DrawTextComponent(this);
        this.tagComponent.setText("Move with the arrows ! 0 points");
        this.tagComponent.setSize(30);
        this.tagComponent.setColor("white");
        this.addDrawComponent( this.tagComponent)
        this.addColliderComponent(new RigidBodyComponent(this));
        this.addComponent(new PlayerMovementComponent(this, 1));
    }

    onCollision(collider: ColliderComponent): void {
        /*if (collider.getParent().getTag() == "Enemy") {
            this.enemyDefeated++;
            this.tagComponent.setText(this.enemyDefeated+" points");
            collider.getParent().destroy();
        }*/
    }

}