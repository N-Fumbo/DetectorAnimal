"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
require("jquery-validation");
require("jquery-validation-unobtrusive");
const Notification_1 = __importDefault(require("../Notification"));
const ModalWindow_1 = __importDefault(require("../ModalWindow"));
function submit() {
    (0, jquery_1.default)('#form_register').on('submit', function (e) {
        e.preventDefault();
        const formData = (0, jquery_1.default)(this).serialize();
        const submitInput = (0, jquery_1.default)(this).find('input[type="submit"]');
        submitInput.prop('disabled', true);
        jquery_1.default.ajax({
            url: 'Account/Register',
            type: 'post',
            data: formData,
            success: function (result) {
                (0, jquery_1.default)(`#form_register .form_global_error`).text('');
                if (result.success) {
                    const modalWindowRegister = new ModalWindow_1.default('#modal_window_register');
                    modalWindowRegister.close();
                    const notification = new Notification_1.default((0, jquery_1.default)('#account_created'));
                    notification.show(8000);
                }
                else {
                    if (result.errors) {
                        result.errors.forEach(error => {
                            if (error.key !== '') {
                                (0, jquery_1.default)(`#form_register span[data-valmsg-for='${error.key}']`).text(error.errorMessage);
                            }
                            else {
                                (0, jquery_1.default)(`#form_register .form_global_error`).text(error.errorMessage);
                            }
                        });
                    }
                }
                submitInput.prop('disabled', false);
            },
            error: function () {
                submitInput.prop('disabled', false);
            }
        });
    });
}
exports.default = submit;
