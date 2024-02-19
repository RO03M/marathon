import Konva from "konva";
import { CircleProps } from "./types";
import { Shape } from "../shape";

export class Circle extends Shape {
    public radius: number;
    public shape: Konva.Circle;

    constructor(props: CircleProps) {
        super(props);
        
        this.radius = props.radius;
        
        this.konvaLayer = new Konva.Layer();
        this.shape = new Konva.Circle({
            x: this._x,
            y: this._y,
            radius: this.radius,
            fill: this.fillColor
        });

        this.konvaLayer.add(this.shape);
    }

    get _konva() {
        return this.shape;
    }
}