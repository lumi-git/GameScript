
import { Scene } from "../gamescript/Scene";
import { Vector2 } from "../gamescript/Vector2";
import { MyEnemy } from "./MyEnemy";
import { MyPlayer } from "./MyPlayer";
import type p5 from "p5";
import { terrain } from "./MyTerrain";


export class MyScene extends Scene {
    time = 0
    constructor() {
        super();
    }

    start(p: p5) {
        console.log("Hello from default Scene");
        this.addObject(new terrain(new Vector2(20000, 20000)));
        this.addObject(new MyPlayer());

    }

    update(p: p5, dt: number): void {
        //spawn a new MyEnemy object every 2 seconds
        this.time += dt;
        if(this.time > 2000){
            this.time = 0;
            const randomVector:Vector2 = new Vector2(Math.random()*20000, Math.random()*20000);
            this.addObject(new MyEnemy(randomVector));
        }

    }

}
