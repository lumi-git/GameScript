
import { defaultGameObject } from "./defaultGameObject";
import { Scene } from "./Scene";
import type p5 from "p5";


export class defaultScene extends Scene {

    constructor() {
        super();
    }

    start(p: p5) {
        console.log("Hello from default Scene");
        this.addObject(new defaultGameObject());
    }

}
