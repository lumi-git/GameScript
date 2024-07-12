import type p5 from "p5";
import { GameObject } from "../GameObject";
import type { LocalAnimator } from "./LocalAnimator";

export class Annimation {
    protected animator?:LocalAnimator;
    protected parent?:GameObject;
    private playing:boolean = false;
    private currentFrame:number = 0;


    constructor() {

    }

    public setAnimator(animator:LocalAnimator) {
        this.animator = animator;
        this.parent = animator.getParent();
    }

    play() {
        this.playing = true;
    }

    stop() {
        this.playing = false;
    }

    Mupdate(p: p5) {
        if(this.playing) {
            this.currentFrame += 1;
                this.currentFrame = 0;
                this.update(p);
        }
    
    }

    update(p:p5) {
    
    }

}