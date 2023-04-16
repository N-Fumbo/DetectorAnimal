import { Size } from "../engine/additional";
import Engine from "../engine/Engine";
import SizeScreen from "./SizeScreen";
import GeometricObject from "../engine/objects/base/GeometricObject";
import InitObject from "./init objects/base/InitObject";

class Scene {

    public isWorkingEngine: boolean;

    public readonly view: HTMLCanvasElement;

    public readonly engine: Engine = new Engine();

    public readonly context: CanvasRenderingContext2D;

    private readonly initObject: InitObject;

    constructor(initObject: InitObject, isWorkingEngine: boolean, isMobile: boolean) {
        this.initObject = initObject;

        this.engine = new Engine();

        this.view = document.createElement('canvas');
        let context = this.view.getContext('2d');
        
        if (!context) {
            throw new Error('Unable to get 2D context.');
        }

        this.context = context;

        this.isWorkingEngine = isWorkingEngine;

        this.resize();


        if (isMobile === false) {
            window.addEventListener('resize', () => this.resize());
        }

        document.body.append(this.view);
    }

    public getSizeScene(): Size {
        return { width: this.view.width, height: this.view.height };
    }

    public setSizeScene(size: Size): void {
        this.view.width = size.width;
        this.view.height = size.height;
    }

    public draw(): void {
        this.engine.objects.forEach(object => {
            object.draw(this.context);
        });
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.view.width, this.view.height);
    }

    public update(time: number, iterations: number): void {
        this.engine.update(time, iterations);
    }

    public add(...items: Array<GeometricObject>): void {
        this.engine.addObjects(...items);
    }

    public remove(...items: Array<GeometricObject>): void {
        this.engine.removeObjects(...items);
    }

    private resize(): void {
        const currentIsWorkingEngine = this.isWorkingEngine;

        this.isWorkingEngine = false;
        const sizeScreen: Size = SizeScreen.getSizeScreen();
        this.view.width = sizeScreen.width;
        this.view.height = sizeScreen.height;

        this.engine.objects = [];

        this.creationBaseObjects();

        this.isWorkingEngine = currentIsWorkingEngine;
    }

    private creationBaseObjects(): void {
        this.engine.addObjects(...this.initObject.init(this.getSizeScene()))
    }
}

export default Scene;