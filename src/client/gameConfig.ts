import p5 from 'p5';
import { Game } from './gamescript/Game';
import { MyScene } from './myGame/MyScene';

export function run() {
    const sketch = (p:any) => {
        let game:Game = Game.getInstance();
    
        game.setScene(new MyScene());
        p.setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            game.setScreenSize(p.windowWidth, p.windowHeight);
            canvas.parent('canvas-container');

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
                game.setScreenSize(p.windowWidth, p.windowHeight);
            };
            game.Mstart(p); 
        };

        p.draw = () => {
            p.background("#101010");
            game.runFrame(p);  
        };
    };

    new p5(sketch);
}