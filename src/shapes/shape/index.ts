import Konva from "konva";
import { ShapeProps } from "./types";
import { lerpCallback } from "./utils";
import { Vector2 } from "../../math";
import { Time } from "../../core/time";

// // Should extend node in the future?
export class Shape {
    protected _x: number;
    protected _y: number;
    protected fillColor?: string;
    protected shape?: Konva.Shape;

    public konvaLayer?: Konva.Layer;

    constructor(props: ShapeProps) {
        this._x = props.x;
        this._y = props.y;
        this.fillColor = props.fillColor;
        this.konvaLayer = new Konva.Layer();
    }
    
    public get x() {
        return this._x ?? 0;
    }
    
    public get y() {
        return this._y ?? 0;
    }
    
    private tempAnimate(currentTime: number, duration: number, startTime: number, startX: number, toX: number) {
        const elapsed = currentTime - startTime;
        const progress = duration === 0 ? 1 : Math.min(elapsed / duration, 1);

        const currentX = startX + (toX - startX) * progress;

        this.shape!.x(currentX);
        this._x = currentX;

        if (progress < 1) {
            requestAnimationFrame((curr) => this.tempAnimate(curr, duration, startTime, startX, toX));
        }
    }

    public * moveTo(position: Vector2, duration: number = 1000) {
        for (let i = 0; i < duration; i += Time.deltaTime) {
            const temp = Vector2.lerpOverTime(new Vector2(this._x, this._y), position, duration, i);

            this.shape!.x(temp.x);
            this.shape!.y(temp.y);
            yield;
        }

        this._x = position.x;
        this._y = position.y;
    }

    public set x(x: number) {
        const duration = 1000;
        const startTime = performance.now();
        const startX = this._x;

        if (!this.shape) return;

        // requestAnimationFrame((currentTime) => this.tempAnimate(currentTime, duration, startTime, startX, x));
        requestAnimationFrame((currentTime) => lerpCallback({
            currentTime,
            duration,
            startTime,
            startValue: startX,
            value: x,
            callback: (currentValue) => {
                this.shape!.x(currentValue);
                this._x = currentValue;
            }
        }));
    }

    public set y(y: number) {
        const duration = 1000;
        const startTime = performance.now();
        const startY = this._y;

        if (!this.shape) return;

        // requestAnimationFrame((currentTime) => this.tempAnimate(currentTime, duration, startTime, startX, x));
        requestAnimationFrame((currentTime) => lerpCallback({
            currentTime,
            duration,
            startTime,
            startValue: startY,
            value: y,
            callback: (currentValue) => {
                this.shape!.y(currentValue);
                this._y = currentValue;
            }
        }));
    }
}
