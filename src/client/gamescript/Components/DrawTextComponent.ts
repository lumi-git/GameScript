import type p5 from "p5";
import type { GameObject } from "../GameObject";
import { drawComponent } from "../drawComponent";
import type { Camera } from "../Camera";

export class DrawTextComponent extends drawComponent {

    private text: string;
    private size: number;

    constructor(parent: GameObject) {
        super(parent);
        this.text = "";
        this.size = 10;
    }

    draw(p: p5, camera: Camera) {
        p.fill(this.color);
        p.textSize(this.size);
        p.text(this.text, this.getParent().getTransform().getPosition().getX() - camera.getTransform().getPosition().getX(), this.getParent().getTransform().getPosition().getY() - camera.getTransform().getPosition().getY());
    }

    getText() {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }

    getSize() {
        return this.size;
    }

    setSize(size: number) {
        this.size = size;
    }



}