import { Size } from "../engine/additional";

class SizeScreen {

    public static isMobile(): boolean {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    public static getSizeScreen(): Size {
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;

        return {
            width: windowWidth,
            height: windowHeight,
        };
    }
}

export default SizeScreen;