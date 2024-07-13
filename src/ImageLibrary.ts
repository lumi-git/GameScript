import type p5 from "p5";

export class ImageLibrary {
    
    images: any;

    constructor() {
        this.images = {};
    }
    
    getImage(name:string) {
        return this.images[name];
    }

    init(p:p5,imageDirectory:string){

    }

}