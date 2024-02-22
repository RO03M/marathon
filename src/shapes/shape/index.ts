import Konva from "konva";
import { ShapeProps } from "./types";
import { lerpCallback } from "./utils";
import { Vector2 } from "../../math";
import { Time } from "../../core/time";

// // Should extend node in the future?
export class Shape {
    protected _x?: number;
    protected _y?: number;
    protected _rotate?: number;
    protected fillColor?: string;
    protected shape?: Konva.Shape;

    public konvaLayer?: Konva.Layer;

    constructor(props: ShapeProps) {
        this.x = props.x;
        this.y = props.y;
        this.rotate = props.rotate ?? 0;
        this.fillColor = props.fillColor;
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

    public get rotate() {
        return this._rotate ?? 0;
    }
  
    public set rotate(theta: number) {
        this.shape?.rotate(theta);
        this._rotate = theta;
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

    /**
     * Generic smooth variable change
     */
    public * to(props: Partial<ShapeProps>) {
        const entries: [keyof ShapeProps, any][] = Object.entries(props);
        for (const entry of entries) {
            // console.log(entry);
            const [key, value] = entry;

            //NEED TO IMPLEMENT MATH LERP, VECTOR2 LERP WONT SERVE
            // for (let i = 0; i < duration; i += Time.deltaTime) {
            //     const temp = Vector2.lerpOverTime(initialVector, position, duration, i);
    
            //     this.x = temp.x;
            //     this.y = temp.y;
                
            //     yield;
            // }

            console.log(this[key]);
        }
        // console.log(entries);
        // console.log(Object.keys(props));
    }
    
}
