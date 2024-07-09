import { RequestSender } from '$lib/RequestSender';
import { messageSubscriber } from '$lib/messageSubscriber';
import type p5 from 'p5';
import { Camera } from './Camera';
import { SpatialHashmap } from './SpatialHashmap';
import { Vector2 } from './Vector2';
import { Scene } from './Scene';
import { defaultScene } from './defaultScene';
import { gameRequest } from '$lib/gameRequest';
import { gameRequestFactory } from '$lib/gameRequestFactory';

export class Game extends messageSubscriber{

    static instance: Game;
    protected sender: RequestSender;
    private camera: Camera;
    private collisionSystem: SpatialHashmap;
    private scene: Scene;

    private RemoteRequestQueue: gameRequest[] = [];

    private mousePosition:Vector2 = new Vector2(0,0); 

    keys: any = {};

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    constructor(){
        super();
        this.camera = new Camera();
        this.sender = new RequestSender();
        this.collisionSystem = new SpatialHashmap(100);
        this.scene = new defaultScene(); 
    }

    setScene(scene: any){
        this.scene = scene;
        this.scene.attachGame(this);
    }

    getScene(){
        return this.scene;
    }

    getSender(): RequestSender {
        return this.sender;
    }

    onMessage(req: gameRequest): void {
        this.RemoteRequestQueue.push(req);
    }

    handleRemoteRequests(){
        for (var req of this.RemoteRequestQueue){
            if (req.Type == "SpawnObject"){
                var cls:any = this.scene.getTypeRegistry().getTypeClass(req.Metadata.objectData.Type)
                this.scene.addObject((cls)!.fromSerialized(req.Metadata.objectData));
            }else

            if (req.Type == "DestroyObject"){
                this.scene.removeObjectById(req.Metadata.objectData.id);
            }else

            if(req.Type == "FullState"){
                this.scene.UpdateState(req.Metadata.objectData);
            }else

            if (req.Type == "UpdateObject"){
                this.scene.updateObject(req.Metadata.objectData.id,req.Metadata.objectData);
            }
        }
        this.RemoteRequestQueue = [];
    }

    start(p:p5){
        
        this.sender.sendRequest(gameRequestFactory.getFullStateRequest());

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
    
        this.handleRemoteRequests();
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
        //this.collisionSystem.draw(p);
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