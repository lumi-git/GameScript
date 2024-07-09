import { Component } from "../Component";
import type { GameObject } from "../GameObject";

export class loadTestComponent extends Component {
  constructor(parent:GameObject) {
    super(parent);

  }

    update() {
        console.log("loadTestComponent");
    }

}
