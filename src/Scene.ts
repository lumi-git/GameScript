import type p5 from "p5";
import { Camera } from "./Camera";
import { Game } from "./Game";
import { GameObject } from "./GameObject";

export abstract class Scene {

    //this counter will be decrease to avoid id conflicts with server objects
    LocalObjectIdCounter: number = -100;
    
    //now game objects will be stored in the game object with the id as the key

    gameObjects:Map<number, GameObject>;

    objectsByTag:Map<string, GameObject[]>;


    game?:Game;

    constructor() {
        this.gameObjects = new Map<number, GameObject>();
        this.objectsByTag = new Map<string, GameObject[]>();
    }



    attachGame(game: Game){
        this.game = game;
    }

    addObjectByTag(obj: GameObject){
        if (!this.objectsByTag.has(obj.getTag())){
            this.objectsByTag.set(obj.getTag(), []);
        }
        this.objectsByTag.get(obj.getTag())?.push(obj);
    }


    getObjectsByTag(tag: string): GameObject[]{
        return this.objectsByTag.get(tag) || [];
    }

    removeObjectByTag(obj: GameObject){
        this.objectsByTag.get(obj.getTag())?.splice(this.objectsByTag.get(obj.getTag())?.indexOf(obj)!, 1);
    }


    addObject(obj: GameObject){
        obj.Mstart();
        if (obj.getId() == -1){
            obj.setId(this.getnewLocalObjectId());
        }
        this.addObjectByTag(obj);
        this.gameObjects.set(obj.getId(),obj);
    }

    removeObject(obj: GameObject){
        obj.Mend();
        this.removeObjectByTag(obj);
        this.gameObjects.delete(obj.getId());
    }

    removeObjectById(id: number){
        this.gameObjects.get(id)?.Mend();
        this.objectsByTag.get(this.gameObjects.get(id)!.getTag())?.splice(this.objectsByTag.get(this.gameObjects.get(id)!.getTag())?.indexOf(this.gameObjects.get(id)!)!, 1);
        this.gameObjects.delete(id);
    }

    moveObject(obj: GameObject, x: number, y: number){
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);
    }

    Mstart(p:p5){
        this.start(p);
    }

    start(p:p5){
    }

    Mupdate(p:p5,dt:number){
        for(var ob of this.gameObjects.values()){
            ob.Mupdate(p,dt);
            if (ob.shouldBeDestroyed()){
                this.removeObject(ob);
            }
        }
        this.update(p,dt);
    }

    update(p:p5,dt:number){
    }

    Mdraw(p:p5,camera: Camera){
        this.gameObjects.forEach(obj => obj.Mdraw(p,camera));
        this.draw(p,camera);
    }

    draw(p:p5,camera: Camera){
    
    }

    getnewLocalObjectId(): number {
        return this.LocalObjectIdCounter--;
    }

    Mend(){
        for(var ob of this.gameObjects.values()){
            ob.Mend();
        }
        this.end()
    }

    end(){

    }
    

}