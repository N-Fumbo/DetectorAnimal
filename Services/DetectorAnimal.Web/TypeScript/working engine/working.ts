import Scene from "./Scene";
import EventScene from "./EventScene";

const working = (): void => {
    const scene: Scene = new Scene(false);

    const eventScene: EventScene = new EventScene(scene);

    if ('ontouchstart' in window) {
        scene.view.addEventListener('touchstart', (e: TouchEvent) => eventScene.down(e));

        scene.view.addEventListener('touchend', (e: TouchEvent) => eventScene.up(e));

        scene.view.addEventListener('touchmove', (e: TouchEvent) => eventScene.move(e, true));
    }
    else {
        scene.view.addEventListener('mousedown', (e: MouseEvent) => eventScene.down(e));

        scene.view.addEventListener('mouseup', (e: MouseEvent) => eventScene.up(e));

        scene.view.addEventListener('mousemove', (e: MouseEvent) => eventScene.move(e, false));

        scene.view.addEventListener('mouseleave', () => eventScene.outside());
    }

    const iterations: number = 20;

    let lastTimestamp: number = performance.now();

    const tick = (timestamp: number) => {
        const elapsedTime: number = (timestamp - lastTimestamp) / 1000;

        lastTimestamp = timestamp;

        for (let i = 0; i < iterations; i++) {
            if (scene.isWorkingEngine) {
                scene.update(elapsedTime, iterations);
            }
        }
        scene.clear();
        scene.draw();

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

export default working;