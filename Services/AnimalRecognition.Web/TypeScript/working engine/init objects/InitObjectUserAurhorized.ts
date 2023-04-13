import ModalWindow from '../../ModalWindow';
import { Size } from '../../engine/additional';
import Rectangle from '../../engine/objects/Rectangle';
import GeometricObject from '../../engine/objects/base/GeometricObject';
import RectangleStyle from '../../engine/style objects/RectangleStyle';
import InitObject from './base/InitObject';
import $ from 'jquery';

class InitObjectUserAurhorized extends InitObject {

    public init(sizeCanvas: Size): GeometricObject[] {
        const result: Array<GeometricObject> = [];

        const buttonCanvasElements: HTMLCollectionOf<Element> = document.getElementsByClassName('button_canvas');
        if (buttonCanvasElements.length > 0 && buttonCanvasElements[0] !== null) {
            const fontSize = window.getComputedStyle(buttonCanvasElements[0]).fontSize.replace('px', '');
            const fontFamily = 'Calibri, sans-serif';
            const font = `${fontSize}px ${fontFamily}`;

            const butLogOut: Rectangle | null = this.createObjectByElementId('button_canvas_logout',
                new RectangleStyle({ font, strokeStyle: 'black', colorText: 'black', lineWidth: 2 }));

            if (butLogOut !== null) {
                const logout = $('#logout');
                if (logout.length > 0) {
                    butLogOut.addEvent('click', () => {
                        logout.trigger('click');
                    });
                    result.push(butLogOut);
                }
            }

            const butDetect: Rectangle | null = this.createObjectByElementId('button_canvas_detect',
                new RectangleStyle({ font, strokeStyle: 'black', fillStyle: 'black', colorText: 'white', lineWidth: 2 }))

            if (butDetect !== null) {
                butDetect.addEvent('click', () => {
                    new ModalWindow('#modal_window_recognition').open();
                });

                result.push(butDetect);
            }

            const rectangleName: Rectangle | null = this.createObjectByElementId('rectangle_name',
                new RectangleStyle({ font, strokeStyle: 'black', colorText: 'black', lineWidth: 2 }));

            if (rectangleName != null) {
                result.push(rectangleName);
            }

            result.push(...this.createCircles());

            result.push(...this.creatingBorders(sizeCanvas));
        }

        return result;
    }
}

export default InitObjectUserAurhorized;