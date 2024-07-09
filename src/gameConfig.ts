import p5 from 'p5';
import { Game } from './gamescript/Game';
import { defaultScene } from './gamescript/defaultScene';



export function run() {
    const sketch = (p:any) => {
        let game:Game = Game.getInstance();
    
        game.setScene(new defaultScene());
        p.setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('canvas-container');

            p.windowResized = () => {
                var newValue = Math.min(p.windowWidth, p.windowHeight);
                p.resizeCanvas(p.windowWidth, p.windowHeight);
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