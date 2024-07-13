import type { GameObject } from "./GameObject";

// TypeRegistry.ts
type GameObjectConstructor = { new(): GameObject };

export class TypeRegistry {
    private typeMap = new Map<string, GameObjectConstructor>();

    registerType(typeName: string, constructor: GameObjectConstructor) {
        this.typeMap.set(typeName, constructor);
    }

    getTypeClass(typeName: string): GameObjectConstructor | undefined {
        return this.typeMap.get(typeName);
    }
}
