import { Transform } from "./Transform";

export abstract class SerializableGameObject{
    [key: string]: any;


    toSerialized(): any {
        const serializedData: any = {};
        const properties: string[] = Reflect.getMetadata('serializableProperties', this.constructor) || [];
        properties.forEach((property) => {
            const value = this[property];
            serializedData[property] = value instanceof SerializableGameObject ? value.toSerialized() : value;
        });
        serializedData["Type"] = this.constructor.name;
        return serializedData;
    }

    static fromSerialized<T extends SerializableGameObject>(this: new () => T, data: any): T {
        const instance = new this();

        Object.keys(data).forEach(property => {
            if (data[property] instanceof Object && !(data[property] instanceof Array)) {
                if (property === "transform" && instance[property] instanceof Transform) {
                    instance[property].updateFromData(data[property]);
                } else {
                    (instance as any)[property] = data[property];
                }
            } else {
                (instance as any)[property] = data[property];
            }
        });
    
        return instance;
    }
    
    updateFromRequest(data: any): void {
        const properties: string[] = Reflect.getMetadata('serializableProperties', this.constructor) || [];

        properties.forEach((property) => {
            if (data.hasOwnProperty(property)) {
                const propertyValue = data[property];
                
                // Check if the property is a complex object and needs special handling
                if (propertyValue instanceof Object && !(propertyValue instanceof Array)) {
                    // Assuming a generic method like `updateFromData` exists for complex types
                    if (this[property] instanceof Transform || this[property]?.updateFromData) {
                        this[property].updateFromData(propertyValue);
                    } else {
                        this[property] = propertyValue;
                    }
                } else {
                    // Direct assignment for primitives and simple types
                    
                    this[property] = propertyValue;
                }
            }
        });
    }



}