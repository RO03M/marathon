import { Vector2 } from "../math";
import { Circle } from "../shapes";
import { Stage } from "./stage";

export function* fooScene(stage: Stage) {
    const circle = new Circle({
        radius: 10,
        x: 10,
        y: 10,
        fillColor: "red"
    });

    stage.add(circle);

    yield* circle.moveTo(new Vector2(200, 10));
    yield* circle.moveTo(new Vector2(100, 10));
    // yield* circle.moveTo(new Vector2(300, 10));
    // circle.moveTo
}