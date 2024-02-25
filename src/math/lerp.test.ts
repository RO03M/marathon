import { describe, expect, it } from "vitest";
import { lerp, lerpOverTime } from ".";

describe("Lerp", () => {
    it("Should interpolate", () => {
        const lerp1 = lerp(0, 10, 0);
        const lerp2 = lerp(0, 10, 1);
        const lerp3 = lerp(0, 10, 0.7);

        expect(lerp1).toBe(0);
        expect(lerp2).toBe(10);
        expect(lerp3).toBe(7);
    });

    it("Should interpolate over time", () => {
        const duration = 1000;
        const lerp1 = lerpOverTime(0, 10, duration, 0);
        const lerp2 = lerpOverTime(0, 10, duration, duration);
        const lerp3 = lerpOverTime(0, 10, duration, 700);

        expect(lerp1).toBe(0);
        expect(lerp2).toBe(10);
        expect(lerp3).toBe(7);
    });

    it("Should work with colors", () => {
        const lerp1 = lerp("red", "blue", 0.5);

        expect(lerp1).toBe("#800080");
    });

    it("Should not accept invalid colors", () => {
        expect(() => lerp("vermelho", "blue", 0.5)).toThrowError();
    });
});