import { scale } from "chroma-js";
import { clamp } from "./clamp";

export function lerp(from: string | number, to: string | number, time: number) {
    if (typeof from === "number" && typeof to === "number") {
        time = clamp(time, 0, 1);
    
        return (1 - time) * from + time * to;
    } else if (typeof from === "string" && typeof to === "string") {
        if (CSS.supports("color", from) && CSS.supports("color", to)) {
            return scale([from, to])(time).hex();
        } else {
            throw new Error("Invalid color");
        }
    } else {
        console.error(from, to);
        throw new Error("Invalid types for interpolation: expected string or number");
    }
}

export function lerpOverTime(from: string | number, to: string | number, duration: number, currentDuration: number) {
    const normalizedTime = currentDuration / duration;
    
    return lerp(from, to, normalizedTime);
}