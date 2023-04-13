"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const preloader_1 = __importDefault(require("./preloader"));
const recognitionForm_1 = __importDefault(require("./form/recognitionForm"));
const ModalWindow_1 = __importDefault(require("./ModalWindow"));
(0, jquery_1.default)(() => {
    (0, recognitionForm_1.default)();
    const modalWindowLogIn = new ModalWindow_1.default('#modal_window_recognition');
    (0, jquery_1.default)('#recognition').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null)
            modalWindowLogIn.open();
    });
    (0, jquery_1.default)('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null)
            modalWindowLogIn.close();
    });
    (0, preloader_1.default)(true);
});
