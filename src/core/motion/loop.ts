export function * loop(method: (index: number) => Generator, loopCount: number) {
    for (let i = 0; i < loopCount; i++) {
        yield* method(i);
    }
}