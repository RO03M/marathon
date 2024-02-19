import { describe, expect, it } from "vitest";
import { Circle } from "./circle";

describe("Circle", () => {
    it("Should assign the constructor variables", () => {
        const circle = new Circle({
            x: 10,
            y: 2,
            radius: 15
        });

        expect(circle.x).toBe(10);
        expect(circle.y).toBe(2);
        expect(circle.radius).toBe(15);
    });
});