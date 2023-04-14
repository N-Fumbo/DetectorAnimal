"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
require("jquery-validation");
require("jquery-validation-unobtrusive");
const ModalWindow_1 = __importDefault(require("./ModalWindow"));
const preloader_1 = __importDefault(require("./preloader"));
const register_1 = __importDefault(require("./form/register"));
const login_1 = __importDefault(require("./form/login"));
(0, jquery_1.default)(() => {
    const modalWindowPrivacy = new ModalWindow_1.default('#modal_window_privacy');
    (0, jquery_1.default)('#privacy').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.open();
    });
    (0, jquery_1.default)('#modal_window_privacy .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.close();
    });
    const modalWindowLogIn = new ModalWindow_1.default('#modal_window_login');
    (0, jquery_1.default)('#login').on('click', function (e) {
        e.preventDefault();
        modalWindowLogIn.open();
    });
    (0, jquery_1.default)('#modal_window_login .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowLogIn.close();
    });
    const modalWindowRegister = new ModalWindow_1.default('#modal_window_register');
    (0, jquery_1.default)('#register').on('click', function (e) {
        e.preventDefault();
        modalWindowRegister.open();
    });
    (0, jquery_1.default)('#modal_window_register .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowRegister.close();
    });
    const modalWindowDetect = new ModalWindow_1.default('#modal_window_recognition');
    (0, jquery_1.default)('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowDetect.close();
    });
    (0, register_1.default)();
    (0, login_1.default)();
    (0, preloader_1.default)(false);
});
