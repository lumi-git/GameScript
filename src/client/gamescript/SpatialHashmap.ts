import type p5 from "p5";
import type { ColliderComponent } from "./Components/ColliderComponent";
import { Game } from "./Game";

export class SpatialHashmap {
    private cellSize: number;
    private map: Map<number, ColliderComponent[]>;
    private alreadyCollided: Map<string, boolean>;
    private cellMap: Map<ColliderComponent, number[]>;
    private colls: number;

    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.map = new Map<number, ColliderComponent[]>();
        this.alreadyCollided = new Map<string, boolean>();
        this.cellMap = new Map<ColliderComponent, number[]>();
        this.colls = 0;
    }

    getCollsCount(): number {
        return this.colls;
    }

    getTheoreticalCollsCount(): number {
        let count = 0;
        this.map.forEach((list) => count += list.length);
        return count;
    }

    insert(collider: ColliderComponent): void {
        const cells = this.getCells(collider);
        
        cells.forEach(cell => {
            if (!this.map.has(cell)) {
                this.map.set(cell, []);
            }
            this.map.get(cell)!.push(collider);            
        });
    }

    remove(collider: ColliderComponent): void {
        const cells = this.getCells(collider);
        cells.forEach(cell => {
            const list = this.map.get(cell);
            if (list) {
                const index = list.indexOf(collider);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
        });
    }

    clear() {
        this.map.clear();
        this.cellMap.clear();
    }

    getCells(collider: ColliderComponent): number[] {

        const transform = collider.getParent().getTransform();
        
        const x = Math.floor(transform.getPosition().getX() / this.cellSize);
        const y = Math.floor(transform.getPosition().getY() / this.cellSize);
        const x2 = Math.floor((transform.getPosition().getX() + transform.getScale().getX()) / this.cellSize);
        const y2 = Math.floor((transform.getPosition().getY() + transform.getScale().getY()) / this.cellSize);

        const cellSet = new Set<number>();
        for (let i = x; i <= x2; i++) {
            for (let j = y; j <= y2; j++) {
                cellSet.add(this.getCellHash(i, j));
            }
        }
        const cells = Array.from(cellSet);
        this.cellMap.set(collider, cells);
        return cells;
    }

    getCellHash(x: number, y: number): number {
        return x * 31393 + y * 6353;
    }

    query(collider: ColliderComponent): Set<ColliderComponent> {
        const set = new Set<ColliderComponent>();
        const cells = this.getCells(collider);
        cells.forEach(cell => {
            const list = this.map.get(cell);
            if (list) {
                list.forEach(item => set.add(item));
            }
        });
        return set;
    }

    draw(p:p5){
        p.stroke(255);
        p.strokeWeight(1);
        var camerax = Game.getInstance().getCamera().getTransform().getPosition().getX();
        var cameray = Game.getInstance().getCamera().getTransform().getPosition().getY();
        
        for (let i = 0; i < p.width; i += this.cellSize) {
            p.line(i-camerax, -cameray, i-camerax, p.height-cameray);
        }
        for (let i = 0; i < p.height; i += this.cellSize) {
            p.line(-camerax, i-cameray, p.width-camerax, i-cameray);
        }
    }

    checkCollisions(collider: ColliderComponent) {
        const list = this.query(collider);
        list.forEach(g => {
            this.colls += 1;
            if (g === collider || this.checkCollisionHash(collider, g)) {
                return;
            }
            this.addCollisionHash(collider, g);
            const info = this.checkAABBCollision(collider, g);
            if (info) {
                collider.MonCollisionEnter(g);
                g.MonCollisionEnter(collider);
            }
        });
    }

    addCollisionHash(collider1: ColliderComponent, collider2: ColliderComponent) {
        this.alreadyCollided.set(this.getKeyForPair(collider1, collider2), true);
    }

    checkCollisionHash(collider1: ColliderComponent, collider2: ColliderComponent): boolean {
        return this.alreadyCollided.has(this.getKeyForPair(collider1, collider2));
    }

    getKeyForPair(collider1: ColliderComponent, collider2: ColliderComponent): string {
        return collider1.getParent().getId() + "_" + collider2.getParent().getId();
    }

    getHashMap(): Map<number, ColliderComponent[]> {
        return this.map;
    }

    update(){
        this.colls = 0;
        this.map.forEach(list => {
            list.forEach(collider => this.checkCollisions(collider));
        });

        this.alreadyCollided.clear();
    }

    checkAABBCollision(collider1: ColliderComponent, collider2: ColliderComponent): any {
        return collider1.getParent().getTransform().intersects(collider2.getParent().getTransform());
    }
}