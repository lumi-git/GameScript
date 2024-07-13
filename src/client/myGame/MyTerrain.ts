import { Camera } from "../gamescript/Camera";
import { DrawPolyComponent } from "../gamescript/Components/DrawPolyComponent";
import { GameObject } from "../gamescript/GameObject";
import { Vector2 } from "../gamescript/Vector2";

export class terrain extends GameObject {

    constructor(size: Vector2) {
        super();
        this.setName("terrain");
        this.setTag("terrain");
        this.getTransform().setPosition(new Vector2(0,0));
        this.getTransform().setScale(new Vector2(size.getX(),size.getY()));

    }

    start(): void {

        var points = [
            new Vector2(this.getTransform().getPosition().getX() ,
                        this.getTransform().getPosition().getY()),
    
            new Vector2(this.getTransform().getPosition().getX() + this.getTransform().getScale().getX(),
                        this.getTransform().getPosition().getY()),
    
            new Vector2(this.getTransform().getPosition().getX() + this.getTransform().getScale().getX(),
                        this.getTransform().getPosition().getY() + this.getTransform().getScale().getY()),
    
            new Vector2(this.getTransform().getPosition().getX(),
                        this.getTransform().getPosition().getY() + this.getTransform().getScale().getY()),
        ]
        this.addDrawComponent(new DrawPolyComponent(this, points ,"#00000020"));
    }

    draw(p: import("p5"), camera: Camera): void {
        //drawing lines on the terrain to make it look like a grid
        p.stroke(0);
        p.strokeWeight(1);
        for (var i = 0; i < this.getTransform().getScale().getX(); i+=100){
            p.line(this.getTransform().getPosition().getX() + i - camera.getTransform().getPosition().getX(), this.getTransform().getPosition().getY() - camera.getTransform().getPosition().getY(), this.getTransform().getPosition().getX() + i - camera.getTransform().getPosition().getX(), this.getTransform().getPosition().getY() + this.getTransform().getScale().getY() - camera.getTransform().getPosition().getY());
        }
        for (var i = 0; i < this.getTransform().getScale().getY(); i+=100){
            p.line(this.getTransform().getPosition().getX() - camera.getTransform().getPosition().getX(), this.getTransform().getPosition().getY() + i - camera.getTransform().getPosition().getY(), this.getTransform().getPosition().getX() + this.getTransform().getScale().getX() - camera.getTransform().getPosition().getX(), this.getTransform().getPosition().getY() + i - camera.getTransform().getPosition().getY());
        }
        p.noStroke();
    }
}