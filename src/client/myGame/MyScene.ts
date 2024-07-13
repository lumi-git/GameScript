
import { Scene } from "../gamescript/Scene";
import { Vector2 } from "../gamescript/Vector2";
import { MyEnemy } from "./MyEnemy";
import { MyPlayer } from "./MyPlayer";
import type p5 from "p5";
import { terrain } from "./MyTerrain";
import { Game } from "../gamescript/Game";
import { MyWall } from "./MyWall";


export class MyScene extends Scene {
    time = 0
    constructor() {
        super();
    }

    start(p: p5) {
        console.log("Hello from default Scene");
        const ter:terrain = new terrain(new Vector2(20000, 20000))
        this.addObject(ter);
        this.addObject(new MyPlayer(ter));
        p.mousePressed = () => {
            const w:MyWall = new MyWall(new Vector2(Game.getInstance().getMousePosition().getX(),Game.getInstance().getMousePosition().getY()));
            this.addObject(w);
        }
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
