import { Game } from "./Game";
import { Transform } from "./Transform";
import { Vector2 } from "./Vector2";

export class Camera {
    transform: Transform;
    constructor() {
        this.transform = new Transform(0, 0, 0, 0);
    }

    getTransform(): Transform {
        return this.transform;
    }

    follow(followedTransform: Transform,centered: boolean,smooth: boolean) {
    
        if (centered) {
            this.transform.setPosition(followedTransform.getPosition().copy().sub(Game.getInstance().getScreenSize().scaldiv(2).sub(followedTransform.getScale().scaldiv(2))));
        }
        if (smooth) {
            this.transform.setPosition(this.transform.getPosition().add(followedTransform.getPosition().copy().sub(this.transform.getPosition()).scalMul(0.05)));
        }
        else {
            this.transform.setPosition(followedTransform.getPosition());
        }
    }

}
