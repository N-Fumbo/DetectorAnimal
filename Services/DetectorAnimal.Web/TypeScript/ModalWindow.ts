import $ from 'jquery';

class ModalWindow {

    public elementModalWindow: JQuery<HTMLElement>;

    constructor(modalWindowSelector: string) {
        const modalWidnowElement = $(modalWindowSelector);
        if (modalWidnowElement.length === 0)
            throw new Error(`element pop up id: ${modalWindowSelector} not found.`);

        this.elementModalWindow = modalWidnowElement;
    }

    public open() {
        this.elementModalWindow.fadeIn(500);
    }

    public close() {
        this.elementModalWindow.fadeOut(500);
    }
}

export default ModalWindow;