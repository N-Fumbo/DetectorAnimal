"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Notification {
    constructor(element) {
        if (element.length === 0) {
            throw new Error('element is null');
        }
        this.element = element;
    }
    show(closeInMilliseconds) {
        this.element.fadeIn(700, () => {
            setTimeout(() => {
                this.element.fadeOut(700);
            }, closeInMilliseconds);
        });
    }
}
exports.default = Notification;
