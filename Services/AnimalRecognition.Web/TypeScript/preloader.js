"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const working_1 = __importDefault(require("./working engine/working"));
const preloader = (isUserAuthorized) => {
    const preloader = (0, jquery_1.default)('#preloader');
    const percent = (0, jquery_1.default)('#percent_preloader');
    const mediaFiles = (0, jquery_1.default)('img');
    if (preloader !== null && percent !== null) {
        let countLoadImages = 0;
        const updateInfoPreloader = () => {
            countLoadImages++;
            percent.text(`${((countLoadImages / mediaFiles.length) * 100).toFixed(1)}%`);
            if (countLoadImages === mediaFiles.length) {
                percent.text('100%');
                preloader.fadeOut(700);
                (0, working_1.default)(isUserAuthorized);
            }
        };
        if (mediaFiles.length > 0) {
            mediaFiles.each(function () {
                if (this.complete) {
                    updateInfoPreloader();
                }
                else {
                    this.onload = () => updateInfoPreloader();
                    this.onerror = () => updateInfoPreloader();
                }
            });
        }
        else {
            updateInfoPreloader();
        }
    }
};
exports.default = preloader;
