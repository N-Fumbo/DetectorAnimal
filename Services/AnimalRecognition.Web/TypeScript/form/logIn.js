"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const common_1 = require("./common");
function submit() {
    (0, common_1.handlePostRequestSerialize)('#form_login', 'Account/LogIn', function (result) {
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
                        (0, jquery_1.default)('#form_login .form_global_error').text(error.errorMessage);
                    }
                });
            }
        }
    });
}
exports.default = submit;
