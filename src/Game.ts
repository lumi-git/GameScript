import type p5 from 'p5';
import { Camera } from './Camera';
import { SpatialHashmap } from './SpatialHashmap';
import { Vector2 } from './Vector2';
import { Scene } from './Scene';
import { defaultScene } from './defaultScene';


export class Game{

    static instance: Game;
    private camera: Camera;
    private collisionSystem: SpatialHashmap;
    private scene: Scene;

    private ScreenSize:Vector2 = new Vector2(0,0);

    private mousePosition:Vector2 = new Vector2(0,0); 

    keys: any = {};

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    constructor(){
        this.camera = new Camera();
        this.collisionSystem = new SpatialHashmap(100);
        this.scene = new defaultScene(); 
    }

    setScreenSize(width: number, height: number){

        this.ScreenSize.setX(width);
        this.ScreenSize.setY(height);
    }

    getScreenSize():Vector2{
        return this.ScreenSize;
    }

    setScreenWidth(width: number){
        this.ScreenSize.setX(width);
    }

    setScreenHeight(height: number){
        this.ScreenSize.setY(height);
    }

    getScreenWidth(){
        return this.ScreenSize.getX();
    }

    getScreenHeight(){
        return this.ScreenSize.getY();
    }



    setScene(scene: any){
        this.scene = scene;
        this.scene.attachGame(this);
    }

    getScene(){
        return this.scene;
    }

    start(p:p5){
    }

    Mstart(p:p5){
        this.start(p);
        this.scene.Mstart(p);
        
    }

    private lastUpdateTime: number = Date.now(); 
    deltaTime = 0;
    Mupdate(p:p5){
        
        const now = Date.now();
        this.deltaTime = now - this.lastUpdateTime;
        this.lastUpdateTime = now; 
        this.mousePosition.setX(p.mouseX + this.camera.getTransform().getPosition().getX());
        this.mousePosition.setY(p.mouseY + this.camera.getTransform().getPosition().getY());
        this.collisionSystem.getHashMap().clear();
        this.scene.Mupdate(p, this.deltaTime );
        this.collisionSystem.update();
    }
    

    getMousePosition():Vector2{
        return this.mousePosition;
    }

    getCollisionSystem(): SpatialHashmap {
        return this.collisionSystem;
    }

    getCamera(): Camera {
        return this.camera;
    }

    draw(p:p5) {
        this.scene.Mdraw(p,this.camera);
        this.collisionSystem.draw(p);
        p.textSize(32);
        p.fill("black");
        p.text("FPS: " + Math.round(1000/this.deltaTime), 500, 30);
    }
    
    runFrame(p:p5){
        this.Mupdate(p);
        this.draw(p);
    }

    getnewLocalObjectId(): number {
        return this.scene.getnewLocalObjectId();
    }

    end(){
        this.scene.Mend();
    }

}