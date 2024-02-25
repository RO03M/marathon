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

    public * moveTo(position: Vector2, duration: number = 1000) {
        const initialVector = new Vector2(this.x, this.y);
        for (let i = 0; i < duration; i += Time.deltaTime) {
            const temp = Vector2.lerpOverTime(initialVector, position, duration, i);

            this.x = temp.x;
            this.y = temp.y;
            
            yield;
        }
    }

    private interpolate(from: number, to: number, duration: number, currentDuration: number, propName: keyof ShapeProps) {
        if (propName === "fillColor") {
            return "#fff";
        } else {
            return lerpOverTime(from, to, duration, currentDuration);
        }
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
                // console.log(entry);
                const [key, value] = entry;
    
                const foo = this[key];
                // const currentValue = lerpOverTime(initialValues[key], value, duration, currentDuration);
                const currentValue = lerpOverTime(initialValues[key], value, duration, currentDuration);
                if (typeof this[key] === typeof currentValue) {
                    this[key] = currentValue;
                }
            }

            yield;
        }
    }
    
}
