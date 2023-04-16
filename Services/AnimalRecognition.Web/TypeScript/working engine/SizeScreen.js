"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SizeScreen {
    static isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    //public static getSizeScreen(): Size {
    //    if (this.isMobile()) {
    //        const deviceWidth = screen.width;
    //        const deviceHeight = screen.height;
    //        const windowWidth = window.innerWidth;
    //        const windowHeight = window.innerHeight;
    //        const isViewportScaled =
    //            windowWidth !== deviceWidth || windowHeight !== deviceHeight;
    //        return {
    //            width: isViewportScaled ? deviceWidth : windowWidth,
    //            height: isViewportScaled ? deviceHeight : windowHeight,
    //        };
    //    }
    //    return {
    //        width: window.innerWidth,
    //        height: window.innerHeight,
    //    };
    //}
    static getSizeScreen() {
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;
        return {
            width: windowWidth,
            height: windowHeight,
        };
    }
}
exports.default = SizeScreen;
