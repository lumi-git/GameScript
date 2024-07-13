import type p5 from "p5";
import { Component } from "../Component";
import { Game } from "../Game";
import type { GameObject } from "../GameObject";
import { ColliderComponent } from "./ColliderComponent";

export class RigidBodyComponent extends Component {
    private isStatic: boolean;

    constructor(parent: GameObject, isStatic: boolean = false) {
        super(parent);
        this.isStatic = isStatic;
    }

    update(p: p5, dt: number) {
        Game.getInstance().getCollisionSystem().insert(this);
    }

    MonCollisionEnter(collider: RigidBodyComponent) {
        this.getParent().MonCollision(collider);

        // Get the positions and sizes of both objects
        var thisPosition = this.getParent().getTransform().getPosition();
        var thisHalfSize = this.getParent().getTransform().getScale().scalMul(0.5);
        var colliderPosition = collider.getParent().getTransform().getPosition();
        var colliderHalfSize = collider.getParent().getTransform().getScale().scalMul(0.5);

        // Calculate the difference in positions
        var delta = thisPosition.sub(colliderPosition);

        // Calculate the overlap on each axis
        var overlapX = thisHalfSize.getX() + colliderHalfSize.getX() - Math.abs(delta.getX());
        var overlapY = thisHalfSize.getY() + colliderHalfSize.getY() - Math.abs(delta.getY());

        // Determine the smallest overlap axis and resolve the collision
        if (overlapX < overlapY) {
            // Resolve collision in X direction
            if (!this.isStatic && !collider.isStatic) {
                if (delta.getX() > 0) {
                    thisPosition.setX(thisPosition.getX() + overlapX * 0.5);
                    colliderPosition.setX(colliderPosition.getX() - overlapX * 0.5);
                } else {
                    thisPosition.setX(thisPosition.getX() - overlapX * 0.5);
                    colliderPosition.setX(colliderPosition.getX() + overlapX * 0.5);
                }
            } else if (!this.isStatic) {
                if (delta.getX() > 0) {
                    thisPosition.setX(thisPosition.getX() + overlapX);
                } else {
                    thisPosition.setX(thisPosition.getX() - overlapX);
                }
            } else if (!collider.isStatic) {
                if (delta.getX() > 0) {
                    colliderPosition.setX(colliderPosition.getX() - overlapX);
                } else {
                    colliderPosition.setX(colliderPosition.getX() + overlapX);
                }
            }
        } else {
            // Resolve collision in Y direction
            if (!this.isStatic && !collider.isStatic) {
                if (delta.getY() > 0) {
                    thisPosition.setY(thisPosition.getY() + overlapY * 0.5);
                    colliderPosition.setY(colliderPosition.getY() - overlapY * 0.5);
                } else {
                    thisPosition.setY(thisPosition.getY() - overlapY * 0.5);
                    colliderPosition.setY(colliderPosition.getY() + overlapY * 0.5);
                }
            } else if (!this.isStatic) {
                if (delta.getY() > 0) {
                    thisPosition.setY(thisPosition.getY() + overlapY);
                } else {
                    thisPosition.setY(thisPosition.getY() - overlapY);
                }
            } else if (!collider.isStatic) {
                if (delta.getY() > 0) {
                    colliderPosition.setY(colliderPosition.getY() - overlapY);
                } else {
                    colliderPosition.setY(colliderPosition.getY() + overlapY);
                }
            }
        }

        // Set the new positions
        this.getParent().getTransform().setPosition(thisPosition);
        collider.getParent().getTransform().setPosition(colliderPosition);
    }
    
    // Getter and setter for isStatic
    getIsStatic(): boolean {
        return this.isStatic;
    }

    setIsStatic(isStatic: boolean): void {
        this.isStatic = isStatic;
    }
}
