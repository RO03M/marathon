import Konva from "konva";
import { Shape } from ".";
import { ShapeProps } from "./shape/types";

export class Rectangle extends Shape {
    constructor(props: ShapeProps) {
        super(props);
        
        this.shape = new Konva.Rect({
            ...props,
            width: 10,
            height: 10,
            fill: "blue",
            offset: {
                x: 5,
                y: 5
            }
        });
        this.konvaLayer?.add(this.shape);
    }
}