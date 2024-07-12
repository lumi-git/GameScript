import type p5 from "p5";
import type { Camera } from "./Camera";
import { Component } from "./Component";
import type { GameObject } from "./GameObject";

export class drawComponent extends Component{
    color
    constructor(parent:GameObject) {
        super(parent);
        this.color = "black";
    }

    setColor(color:string){
        this.color = color;
    }

    getColor(){
        return this.color;
    }

    draw(p: p5,camera:Camera) {
    }

}