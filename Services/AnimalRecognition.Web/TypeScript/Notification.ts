import $ from 'jquery';

class Notification {
    public element: JQuery<HTMLElement>

    constructor(element: JQuery<HTMLElement>) {
        if (element.length === 0) {
            throw new Error('element is null');
        }
            
        this.element = element;
    }

    public show(closeInMilliseconds: number) {
        this.element.fadeIn(700, () => {
            setTimeout(() => {
                this.element.fadeOut(700);
            }, closeInMilliseconds);
        });
    }
}

export default Notification;