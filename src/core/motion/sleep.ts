import { Time } from "../time";

// sleep using the delta time
export function * sleep(duration: number, unit = "milliseconds") {
    for (let currentDuration = 0; currentDuration < duration; currentDuration += Time.deltaTime) {
        yield;
    }
}