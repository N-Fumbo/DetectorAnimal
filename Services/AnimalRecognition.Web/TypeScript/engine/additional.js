"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};
exports.clamp = clamp;
