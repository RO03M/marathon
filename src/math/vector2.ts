export class Vector2 {
    public x;
    public y;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static get zero() {
        return new Vector2(0, 0);
    }

    public static get one() {
        return new Vector2(1, 1);
    }

    public static get up() {
        return new Vector2(0, 1);
    }

    public static get down() {
        return new Vector2(0, -1);
    }

    public static get left() {
        return new Vector2(-1, 0);
    }

    public static get right() {
        return new Vector2(1, 0);
    }

    public static lerp(start: Vector2, end: Vector2, time: number) {
        if (time > 1) {
            time = 1;
        } else if (time < 0) {
            time = 0;
        }
        
        start = start.clone();
        end = end.clone();
        
        return end.subtract(start).multiply(time).add(start);
    }

    public static lerpOverTime(start: Vector2, end: Vector2, duration: number, currentDuration: number) {
        const normalizedTime = currentDuration / duration;

        return this.lerp(start, end, normalizedTime);
    }

    public add(number: number): this;
    public add(vector: Vector2): this;
    public add(value: unknown) {
        if (value instanceof Vector2) {
            this.x += value.x;
            this.y += value.y;
        } else if (typeof value === "number") {
            this.x += value;
            this.y += value;
        }

        return this;
    }

    public subtract(number: number): this;
    public subtract(vector: Vector2): this;
    public subtract(value: unknown) {
        if (value instanceof Vector2) {
            this.x -= value.x;
            this.y -= value.y;
        } else if (typeof value === "number") {
            this.x -= value;
            this.y -= value;
        }

        return this;
    }

    public multiply(number: number): this;
    public multiply(vector: Vector2): this;
    public multiply(value: unknown) {
        if (value instanceof Vector2) {
            this.x *= value.x;
            this.y *= value.y;
        } else if (typeof value === "number") {
            this.x *= value;
            this.y *= value;
        }

        return this;
    }

    public divide(number: number): this;
    public divide(vector: Vector2): this;
    public divide(value: unknown) {
        if (value instanceof Vector2) {
            if (value.x === 0 || value.y === 0) {
                throw new Error("Unable to divide by zero");
            }

            this.x /= value.x;
            this.y /= value.y;
        } else if (typeof value === "number") {
            if (value === 0) {
                throw new Error("Unable to divide by zero");
            }

            this.x /= value;
            this.y /= value;
        }

        return this;
    }

    public clone() {
        const clone = Object.assign({}, this);
        Object.setPrototypeOf(clone, Vector2.prototype);
        return clone;
    }

    public get normalized() {
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
    }

    public get magnitude() {
        return Math.hypot(this.x, this.y);
    }
}
