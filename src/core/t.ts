import { Vector2 } from "../math";
import { Circle } from "../shapes";
import { Rectangle } from "../shapes/rectangle";
import { loop } from "./motion/loop";
import { sleep } from "./motion/sleep";
import { Stage } from "./stage";

export function* fooScene(stage: Stage) {
    const center = new Vector2(100, 100);

    const sun = new Circle({
        radius: 20,
        ...center,
        fillColor: "yellow"
    });

    const earth = new Circle({
        radius: 6,
        ...center,
        fillColor: "blue"
    });

    stage.add(sun);
    stage.add(earth);

    yield* loop(function * (index) {
        const radians = index * 4 * (Math.PI / 180);

        const x = Math.cos(radians) * 50;
        const y = Math.sin(radians) * 50;
        
        yield* earth.moveTo((new Vector2(x, y)).add(center), 50);
    }, 1000);
}