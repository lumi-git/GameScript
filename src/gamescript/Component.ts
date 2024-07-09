import type p5 from "p5";
import type { GameObject } from "./GameObject";

export class Component {
    private parent: GameObject;
    
    constructor(parent: GameObject) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    start() {
    }

    update(p: p5,dt:number) {
    
    }

    end() {
    
    }

}
