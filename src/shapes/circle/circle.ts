import Konva from "konva";
import { CircleProps } from "./types";
import { Shape } from "../shape";

export class Circle extends Shape {
    public radius: number;
    public shape: Konva.Circle;

    constructor(props: CircleProps) {
        super(props);
        
        this.radius = props.radius;
        
        // this.konvaLayer = new Konva.Layer();
        this.shape = new Konva.Circle({
            ...props,
            fill: props.fillColor,
        });
        this.konvaLayer?.add(this.shape);
    }
}