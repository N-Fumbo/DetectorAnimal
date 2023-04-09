"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SizeScreen {
    static isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    static getSizeScreen() {
        if (this.isMobile()) {
            const deviceWidth = screen.width;
            const deviceHeight = screen.height;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const isViewportScaled = windowWidth !== deviceWidth || windowHeight !== deviceHeight;
            return {
                width: isViewportScaled ? deviceWidth : windowWidth,
                height: isViewportScaled ? deviceHeight : windowHeight,
            };
        }
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
}
exports.default = SizeScreen;
