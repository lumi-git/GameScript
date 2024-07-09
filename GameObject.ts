import type p5 from "p5";
import type { Camera } from "./Camera";
import type { Component } from "./Component";
import type { ColliderComponent } from "./Components/ColliderComponent";
import { Game } from "./Game";
import { Transform } from "./Transform";
import { Vector2 } from "./Vector2";
import type { drawComponent } from "./drawComponent";
import { Serializable } from "./Serialized";
import { SerializableGameObject } from "./SerializableGameObject";

export class GameObject extends SerializableGameObject{
    @Serializable
    protected transform : Transform;

    @Serializable
    protected futurtransform : Transform;
    
    @Serializable
    protected name: string;
    @Serializable
    protected id: number;

    @Serializable
    protected tag: string;

    protected localTransform:Transform;
    protected lastx : number;
    protected lasty: number;

    protected components: Component[];
    protected drawComponents: drawComponent[];
    colliderComponents: ColliderComponent[];
    protected children: GameObject[];
    private shouldDestroy: boolean = false;
    private cameraAttached: boolean = false;

    constructor() {
        super();
        this.id = -1;
        this.transform = new Transform(0, 0, 0, 0);
        this.localTransform = new Transform(0, 0, 0, 0);
        this.futurtransform = new Transform(0, 0, 0, 0);

        this.lastx = 0;
        this.lasty = 0;
        this.tag = "Untagged";
        this.name = "object";
        this.components = [];
        this.drawComponents = [];
        this.colliderComponents = [];
        this.children = [];

    }

    getFutureTransform(): Transform {
        return this.futurtransform;
    }

    setFutureTransform(transform: Transform) {
        this.futurtransform = transform;
    }

    getTag(): string {
        return this.tag;
    }

    setTag(tag: string) {
        this.tag = tag;
    }

    getName(): string {
        return this.name;
    }

    setId(id: number) {
        this.id = id;
    }

    destroy() {
        this.shouldDestroy = true;
    }
    
    shouldBeDestroyed(): boolean {
        return this.shouldDestroy;
    }

    attachCamera() {
        this.cameraAttached = true;
    }

    getTransform(): Transform {
        return this.transform;
    }

    addComponent(component: Component) {
        this.components.push(component);
    }

    addDrawComponent(component: drawComponent) {
        this.drawComponents.push(component);
    }

    addColliderComponent(component: ColliderComponent) {
        this.colliderComponents.push(component);
    }


    start(){

    }

    Mstart(){
        this.components.forEach(component => component.start());
        this.start();
    }

    asyncMove(vec:Vector2) {
        Game.getInstance().getScene().asyncMoveObject(this, vec.getX(),vec.getY());
        this.lastx = vec.getX();
        this.lasty = vec.getY();
    }

    move(x: number, y: number) {
        this.getTransform().getPosition().setX(x);
        this.getTransform().getPosition().setY(y);
    }

    setName(name: string) {
        this.name = name;
    }

    update(p:p5,dt:number) {
    }

    Mupdate(p:p5,dt:number) {
        if (this.shouldBeDestroyed()){
            return;
        }
        this.colliderComponents.forEach(component => component.update(p,dt));
        this.components.forEach(component => component.update(p,dt));
        this.update(p,dt);
        if (this.cameraAttached) {
            Game.getInstance().getCamera().getTransform().setPosition(this.getTransform().getPosition().sub(new Vector2(p.width/2,p.height/2).sub(this.getTransform().getScale().scalMul(0.5))));
        }
    }

    draw(p:p5,camera: Camera) {
        // Drawing logic using p5 instance (p)
    }

    getId(): number {
        return this.id;
    }

    Mdraw(p:p5,camera: Camera) {
        
        this.drawComponents.forEach(drawComponent => {
            drawComponent.draw(p,camera);
        });

        this.draw(p,camera);
    }

    MonCollision(collider:ColliderComponent){
        this.onCollision(collider);
    }

    onCollision(collider:ColliderComponent){
        
    }

    Mend(){
        this.components.forEach(component => component.end());
        this.end();
    }

    end(){
        
    }

}