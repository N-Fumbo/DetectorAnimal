type Size = {
    width: number,
    height: number
};

type Style = {
    strokeStyle?: string,
    fillStyle?: string,
    lineWidth?: number,
    text?: string,
    font?: string,
    colorText?: string,
    img?: HTMLImageElement,
}

const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
}

export { Size, Style, clamp };