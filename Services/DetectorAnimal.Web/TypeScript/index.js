"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModalWindow_1 = __importDefault(require("./ModalWindow"));
const preloader_1 = __importDefault(require("./preloader"));
const jquery_1 = __importDefault(require("jquery"));
(0, jquery_1.default)(() => {
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
    const modalWindowDetect = new ModalWindow_1.default('#modal_window_detect');
    (0, jquery_1.default)('#modal_window_detect .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowDetect.close();
    });
    (0, preloader_1.default)();
    //$('#form_register').on('submit', function (e) {
    //    e.preventDefault();
    //    const formData = $(this).serialize();
    //    $.ajax({
    //        url: 'Account/Register',
    //        type: 'post',
    //        data: formData,
    //        success: function (result) {
    //            console.log(result);
    //            const response: Response | null = JSON.parse(result);
    //            if (response) {
    //                if (response.success) {
    //                    //�������
    //                }
    //                else if (response.errors) {
    //                    response.errors.forEach(error => {
    //                        $(`#form_register span.form_error[data-valmsg-for='${error.key}']`).text(error.errorMessage);
    //                    });
    //                }
    //                else {
    //                    //...
    //                }
    //            }
    //            else {
    //                //...
    //            }
    //        },
    //        error: function () {
    //        }
    //    })
    //});
});
