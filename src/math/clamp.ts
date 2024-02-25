export function clamp(value: number, min: number, max: number): number {
    if (isNaN(value) || isNaN(min) || isNaN(max)) {
      throw new Error("clamp: Invalid input values");
    }

    if (min > max) {
      throw new Error("clamp: Min value must be less than or equal to max value");
    }
  
    return Math.min(Math.max(value, min), max);
}