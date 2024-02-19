import { beforeEach, describe, expect, expectTypeOf, it, test } from "vitest";
import { Vector2 } from ".";

describe("Vector2", () => {
    it("Should attach x and y", () => {
        const vector = new Vector2(10, 20);
        expect(vector.x).toBe(10);
        expect(vector.y).toBe(20);
    });

    test("If has correct magnitude", () => {
        const vector = new Vector2(3, 4);
        
        expect(vector.magnitude).toBe(5);
    });

    it("Should normalize", () => {
        const vector = new Vector2(10, 4); // 5 / sqrt(29),  2 / sqrt(29)

        expect(vector.normalized.x.toFixed(3)).toBe((5 / Math.sqrt(29)).toFixed(3));
        expect(vector.normalized.y.toFixed(3)).toBe((2 / Math.sqrt(29)).toFixed(3));
    });

    describe("Operations", () => {
        it("Should be able to add", () => {
            const vector = new Vector2(1, 1);
            const another = vector.add(new Vector2(1, -1));
    
            expect(vector.x).toBe(2);
            expect(vector.y).toBe(0);
    
            expect(another).toBeDefined();
    
            vector.add(10);
    
            expect(vector.x).toBe(12);
            expect(vector.y).toBe(10);
        });
    
        it("Should be able to subtract", () => {
            const vector = new Vector2(1, 1);
            const another = vector.subtract(new Vector2(1, -1));
    
            expect(vector.x).toBe(0);
            expect(vector.y).toBe(2);
    
            expect(another).toBeDefined();
    
            vector.subtract(10);
    
            expect(vector.x).toBe(-10);
            expect(vector.y).toBe(-8);
        });
    
        it("Should be able to multiply", () => {
            const vector = new Vector2(1, 1);
            const another = vector.multiply(new Vector2(1, -1));
    
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(-1);
    
            expect(another).toBeDefined();
    
            vector.multiply(10);
    
            expect(vector.x).toBe(10);
            expect(vector.y).toBe(-10);
        });
    
        describe("Should be able to divide", () => {
            const vector = new Vector2(1, 1);
            
            it("By vector", () => {
                const another = vector.divide(new Vector2(2, -1));
    
                expect(vector.x).toBe(0.5);
                expect(vector.y).toBe(-1);
        
                expect(another).toBeDefined();
            });
    
            it("By number", () => {
                vector.divide(10);
        
                expect(vector.x).toBe(0.05);
                expect(vector.y).toBe(-0.1);
            });
    
            it("Throw error when dividing by zero", () => {
                expect(() => vector.divide(0)).toThrowError("Unable to divide by zero");
                expect(() => vector.divide(new Vector2(0, 0))).toThrowError("Unable to divide by zero");
                expect(() => vector.divide(new Vector2(0, 1))).toThrowError("Unable to divide by zero");
                expect(() => vector.divide(new Vector2(1, 0))).toThrowError("Unable to divide by zero");
            });
        });
    
        it("Should chain the math methods", () => {
            const vector = new Vector2(1, 1);
    
            const equation = vector // 1, 1
                .add(new Vector2(1, 1))// 2, 2
                .add(new Vector2(1, 1)) // 3, 3
                .subtract(new Vector2(1, 1)) // 2, 2
                .multiply(new Vector2(2, 2)) // 4, 4
                .divide(new Vector2(10, 10)); // 0.4, 0.4
    
            expect(equation).toEqual(new Vector2(0.4, 0.4));
        });
    });


    it("Should have the lazy instances", () => {
        expect(Vector2.zero).toEqual(new Vector2(0, 0));
        expect(Vector2.one).toEqual(new Vector2(1, 1));
        expect(Vector2.up).toEqual(new Vector2(0, 1));
        expect(Vector2.right).toEqual(new Vector2(1, 0));
        expect(Vector2.down).toEqual(new Vector2(0, -1));
        expect(Vector2.left).toEqual(new Vector2(-1, 0));
    });

    describe("Clone", () => {
        let original: Vector2;
        let clone: Vector2;

        beforeEach(() => {
            original = Vector2.one;
            clone = original.clone();
        });

        it("Should return a vector", () => {
            expect(clone).toBeDefined();
            expectTypeOf(clone).toEqualTypeOf<Vector2>();
        });

        test("A clone vector should not change the original", () => {
            clone.x = 10;

            expect(clone).toEqual(new Vector2(10, 1));
            expect(original).toEqual(Vector2.one);
        });

        it("Should change the original if it is not a clone", () => {
            const original = Vector2.one;
            const fakeClone = original;

            fakeClone.x = 10;

            expect(original).toEqual(fakeClone);
        });

        it("Should have a prototype of the vector2", () => {
            expect(clone.add).toBeDefined();
        });
    });

    describe("Interpolations", () => {
        describe("Lerp", () => {
            const from = Vector2.zero;
            const to = Vector2.one;

            const lerp1 = Vector2.lerp(from, to, 0);
            const lerp2 = Vector2.lerp(from, to, 1);
            const lerp3 = Vector2.lerp(from, to, 0.5);

            it("Should not change the variables passed to the lerp function", () => {
                expect(from).toEqual(Vector2.zero);
                expect(to).toEqual(Vector2.one);
            });

            it("Should match the correct lerp intervals", () => {
                expect(lerp1).toEqual(Vector2.zero);
                expect(lerp2).toEqual(Vector2.one);
                expect(lerp3).toEqual(new Vector2(0.5, 0.5));
            });

            it("Should return a normalized value", () => {
                const lerp = Vector2.lerp(from, to, 1.5);
                const lerpLessThanZero = Vector2.lerp(from, to, -1);
                expect(lerp).toEqual(to);
                expect(lerpLessThanZero).toEqual(from);

            });

            it.todo("Should lerp 'backwards'");
        });
    });
});