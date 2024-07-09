import type p5 from "p5";
import { Component } from "../Component";
import { GameObject } from "../GameObject";
import { Annimation } from "./Annimation";

export class LocalAnimator extends Component {

    private animations: any = {};

    private currentAnimation: any;

    constructor(parent:GameObject) {
        super(parent);
        this.animations = {};
        this.currentAnimation = null;
    }

    addAnimation(name:string, animation:Annimation) {
        animation.setAnimator(this);
        this.animations[name] = animation;
    }

    playAnimation(name:string) {
        if (this.currentAnimation === this.animations[name])
            return;
        if (this.currentAnimation)
            this.currentAnimation.stop();
        this.currentAnimation = this.animations[name];
        this.currentAnimation.play();
    }

    stopAnimation() {
        if (this.currentAnimation)
            this.currentAnimation.stop();
    }

    update(p:p5,dt:number) {
        if (this.currentAnimation)
            this.currentAnimation.Mupdate(p);
    }
}