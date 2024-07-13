import type p5 from "p5";
import type { Camera } from "./Camera";
import type { Component } from "./Component";
import type { ColliderComponent } from "./Components/ColliderComponent";
import { Game } from "./Game";
import { Transform } from "./Transform";
import { Vector2 } from "./Vector2";
import type { drawComponent } from "./drawComponent";


export class GameObject{

    protected transform : Transform;
    
    protected name: string;

    protected id: number;

    protected tag: string;

    protected localTransform:Transform;

    protected components: Component[];
    protected drawComponents: drawComponent[];
    colliderComponents: ColliderComponent[];
    protected children: GameObject[];
    private shouldDestroy: boolean = false;
    private cameraAttached: boolean = false;

    constructor() {
        this.id = -1;
        this.transform = new Transform(0, 0, 0, 0);
        this.localTransform = new Transform(0, 0, 0, 0);
        this.tag = "Untagged";
        this.name = "object";
        this.components = [];
        this.drawComponents = [];
        this.colliderComponents = [];
        this.children = [];

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


    move(vector: Vector2) {
        this.getTransform().setPosition(vector);
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
            Game.getInstance().getCamera().follow(this.getTransform(),true,true);
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