export class Vector2 {

    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static FromVector2(v: Vector2): Vector2 {
        return new Vector2(v.x, v.y);
    }

    getX(): number {
        return this.x;
    }
    
    getY(): number {
        return this.y;
    }
    
    setX(x: number) {
        this.x = x;
    }
    
    setY(y: number) {
        this.y =y;
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    
    sub(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mul(v: Vector2): Vector2 {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    div(v: Vector2): Vector2 {
        return new Vector2(this.x / v.x, this.y / v.y);
    }

    scaldiv(s: number): Vector2 {
        return new Vector2(this.x / s, this.y / s);
    }

    scalMul(s: number): Vector2 {
        return new Vector2(this.x * s, this.y * s);
    }



    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2 {
        const l = this.length();
        return new Vector2(this.x / l, this.y / l);
    }

    distance(v: Vector2): number {
        return this.sub(v).length();
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    static lerp(start: Vector2, end: Vector2, factor: number): Vector2 {
        return new Vector2(
            start.x + (end.x - start.x) * factor,
            start.y + (end.y - start.y) * factor
        );
    }

    static forward(): Vector2 {
        return new Vector2(1, 0);
    }

    static right(): Vector2 {
        return new Vector2(0, 1);
    }

    static zero(): Vector2 {
        return new Vector2(0, 0);
    }

    static one(): Vector2 {
        return new Vector2(1, 1);
    }

    static random(): Vector2 {
        return new Vector2(Math.random(), Math.random());
    }

    static fromAngle(angle: number): Vector2 {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }


    copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }


    selfAdd(v: Vector2): void {
        this.x += v.x;
        this.y += v.y;
    }

    selfSub(v: Vector2): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    selfMul(v: Vector2): void {
        this.x *= v.x;
        this.y *= v.y;
    }


    selfScalMul(s: number): void {
        this.x *= s;
        this.y *= s;
    }

    selfDiv(v: Vector2): void {
        this.x /= v.x;
        this.y /= v.y;
    }

    selfScaldiv(s: number): void {
        this.x /= s;
        this.y /= s;
    }

    selfNormalize(): void {
        const l = this.length();
        this.x /= l;
        this.y /= l;
    }

    selfLerp(end: Vector2, factor: number): void {
        this.x += (end.x - this.x) * factor;
        this.y += (end.y - this.y) * factor;
    }
}
