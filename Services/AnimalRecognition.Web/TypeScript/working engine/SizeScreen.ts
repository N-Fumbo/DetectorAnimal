import { Size } from "../engine/additional";

class SizeScreen {

    public static isMobile(): boolean {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    public static getSizeScreen(): Size {
        if (this.isMobile()) {
            const deviceWidth = screen.width;
            const deviceHeight = screen.height;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const isViewportScaled =
                windowWidth !== deviceWidth || windowHeight !== deviceHeight;

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

export default SizeScreen;