import { Vector2 } from "../math";
import { Circle } from "../shapes";
import { Rectangle } from "../shapes/rectangle";
import { Stage } from "./stage";

export function* fooScene(stage: Stage) {
    const circle = new Circle({
        radius: 10,
        x: 10,
        y: 10,
        fillColor: "red"
    });

    stage.add(circle);

    const rect = new Rectangle({
        x: 10,
        y: 30,
        fillColor: "blue"
    });

    stage.add(rect);
    yield* rect.to({
        x: 100,
        y: 10
    });
    yield* circle.moveTo(new Vector2(200, 10), 3500);
    // yield* circle.moveTo(new Vector2(100, 10), 500);
    // yield* circle.moveTo(new Vector2(200, 50), 500);
    // yield* circle.moveTo(new Vector2(300, 10));
    // circle.moveTo
}