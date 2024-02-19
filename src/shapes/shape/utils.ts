interface LerpCallback {
    currentTime: number;
    startTime: number;
    duration: number;
    startValue: number;
    value: number;
    callback: (currentValue: number) => void;
}

export function lerpCallback(props: LerpCallback) {
    const elapsed = props.currentTime - props.startTime;
    const progress = props.duration === 0 ? 1 : Math.min(elapsed / props.duration, 1);

    const currentValue = props.startValue + (props.value - props.startValue) * progress;

    props.callback(currentValue);
    
    if (progress < 1) {
        requestAnimationFrame((currentTime) => lerpCallback({ ...props, currentTime }));
    }
}