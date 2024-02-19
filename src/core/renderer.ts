import { sleep } from "../utils";
import { Scene } from "./scene";
import { Stage } from "./stage";
import { Time } from "./time";

export class Renderer {
    public finished = false;
    public readonly fps = 60;
    public readonly msPerFrame = 1000 / this.fps;

    public frames = 0;
    public runner?: Generator;
    public scene: Scene;
    public stage: Stage;
    public loop = true;

    constructor(scene: Scene) {
        this.stage = new Stage({});
        this.scene = scene;
        this.play();
    }

    public play() {
        this.runner = this.scene(this.stage);
        this.finished = false;
        this.stage.mainStage.removeChildren();
        this.run().then(() => {
            console.log("finished");
            this.play();
        });
    }

    private async run() {
        if (!this.runner) {
            return;
        }

        let lastTime = 0;
        while (!this.finished) {
            const currentTime = performance.now();
            Time.deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            this.frames++;

            const frame = this.runner.next();
            this.finished = frame.done ?? false;

            await sleep(this.msPerFrame);
        }
    }
}