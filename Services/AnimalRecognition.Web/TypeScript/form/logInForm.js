"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
require("jquery-validation");
require("jquery-validation-unobtrusive");
function submit() {
    const globalErrorLogInt = (0, jquery_1.default)('#form_login .form_global_error');
    (0, jquery_1.default)('#form_login').on('submit', function (e) {
        e.preventDefault();
        const formData = (0, jquery_1.default)(this).serialize();
        const submitInput = (0, jquery_1.default)(this).find('input[type="submit"]');
        submitInput.prop('disabled', true);
        globalErrorLogInt.text('');
        jquery_1.default.ajax({
            url: 'Account/LogIn',
            type: 'post',
            data: formData,
            success: function (result) {
                if (result.success) {
                    location.reload();
                }
                else {
                    if (result.errors) {
                        result.errors.forEach(error => {
                            if (error.key !== '') {
                                (0, jquery_1.default)(`#form_login span[data-valmsg-for='${error.key}']`).text(error.errorMessage);
                            }
                            else {
                                globalErrorLogInt.text(error.errorMessage);
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
