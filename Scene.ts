import { gameRequestFactory } from "$lib/gameRequestFactory";
import type p5 from "p5";
import { Camera } from "./Camera";
import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { fruit } from "$lib/implementedGames/fruit";
import type { Class } from "estree";
import { TypeRegistry } from "./TypeRegistry";

export abstract class Scene {

    //this counter will be decrease to avoid id conflicts with server objects
    LocalObjectIdCounter: number = -100;
    
    //now game objects will be stored in the game object with the id as the key

    gameObjects:Map<number, GameObject>;

    objectsByTag:Map<string, GameObject[]>;

    typeRegistry = new TypeRegistry();

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

    asyncAddObject(obj: GameObject){
        var request = gameRequestFactory.getSpawnRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    asyncRemoveObject(obj: GameObject){
        var request = gameRequestFactory.getDestroyRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    asyncMoveObject(obj: GameObject, x: number, y: number){
        var oldx = obj.getTransform().getPosition().getX();
        var oldy = obj.getTransform().getPosition().getY();
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);
        obj.setFutureTransform(obj.getTransform().copy());
        var request = gameRequestFactory.getUpdateRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    UpdateState(serverState: any) {
        console.log("updating state");
        const serverIds = new Set<number>();
    
        // Iterate over server state to update and add new objects
        for (const key in serverState) {
            if (serverState.hasOwnProperty(key)) {
                const obj = serverState[key];
                const type = obj.Type;
                const cls: any = this.getTypeRegistry().getTypeClass(type);
                if (cls) {
                    
                    if (this.gameObjects.has(obj.id)) {
                        console.log("updating from request");

                        this.gameObjects.get(obj.id)?.updateFromRequest(obj);
                    } else {
                        const gameObject = cls.fromSerialized(obj);
                        this.addObject(gameObject);
                    }
                    serverIds.add(obj.id);
                }
            }
        }
        //const localObjectIds = new Set<number>(this.gameObjects.keys());
        //const objectsToRemove = Array.from(localObjectIds).filter(id => !serverIds.has(id) && id > 0);
        //objectsToRemove.forEach(id => this.removeObjectById(id));

    }

    updateObject(id:number, state:any){
        this.gameObjects.get(id)?.updateFromRequest(state);
    }


    sendToGame(req: any){
        Game.getInstance().getSender().sendRequest(req);
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

    getTypeRegistry(): TypeRegistry {
        return this.typeRegistry;
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