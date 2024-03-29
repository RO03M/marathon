import Konva from "konva";
import { ShapeProps } from "./types";
import { Vector2, lerpOverTime } from "../../math";
import { Time } from "../../core/time";

// // Should extend node in the future?
export class Shape {
    protected _x: number = 0;
    protected _y: number = 0;
    protected _rotate: number = 0;
    protected shape?: Konva.Shape;

    public konvaLayer?: Konva.Layer;

    constructor(props: ShapeProps) {
        this.x = props.x;
        this.y = props.y;
        this.fillColor = props.fillColor ?? "#000000";
        this.rotate = props.rotate ?? 0;
        this.konvaLayer = new Konva.Layer();
    }
    
    public get x() {
        return this._x ?? 0;
    }
    
    public set x(x: number) {
        this.shape?.x(x);
        this._x = x;
    }

    public get y() {
        return this._y ?? 0;
    }

    public set y(y: number) {
        this.shape?.y(y);
        this._y = y;
    }

    public get scaleX() {
        return this.shape?.getAttr("scale")?.x;
    }

    public set scaleX(scale: number) {
        this.shape?.scaleX(scale);
    }
    
    public get scaleY() {
        return this.shape?.getAttr("scale")?.y;
    }

    public set scaleY(scale: number) {
        this.shape?.scaleY(scale);
    }

    public get rotate() {
        return this.shape?.getAttr("rotate");
    }
  
    public set rotate(theta: number) {
        this.shape?.rotate(theta);
    }

    public get fillColor() {
        return this.shape?.getAttr("fill");
    }

    public set fillColor(fillColor: string) {
        this.shape?.fill(fillColor);
    }

    public get cornerRadius() {
        return this.shape?.getAttr("cornerRadius");
    }

    public set cornerRadius(value: number) {
        this.shape?.setAttr("cornerRadius", value);
    }

    public * moveTo(position: Vector2, duration: number = 1000) {
        yield* this.to({
            x: position.x,
            y: position.y
        }, duration);
    }

    /**
     * Generic smooth variable change
     */
    public * to(props: Partial<ShapeProps>, duration: number) {
        const entries: [keyof ShapeProps, any][] = Object.entries(props) as [keyof ShapeProps, any][];

        const initialValues: Partial<Record<keyof ShapeProps, any>> = {};
        
        entries.forEach((entry) => {
            const [ key ] = entry;

            initialValues[key] = this[key];
        });

        for (let currentDuration = 0; currentDuration < duration; currentDuration += Time.deltaTime) {
            for (const entry of entries) {
                const [key, value] = entry;

                const currentValue = lerpOverTime(initialValues[key], value, duration, currentDuration);

                if (typeof this[key] === typeof currentValue) {
                    this[key] = currentValue as never;//HACK
                }
            }

            yield;
        }
    }
    
}
