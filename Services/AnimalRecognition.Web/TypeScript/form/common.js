"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostRequestFormData = exports.handlePostRequestSerialize = void 0;
const jquery_1 = __importDefault(require("jquery"));
function handlePostRequest(selectorForm, url, data, success) {
    const globalError = (0, jquery_1.default)(`${selectorForm} .form_global_error`);
    const submitInput = (0, jquery_1.default)(`${selectorForm} input[type="submit"]`);
    submitInput.prop('disabled', true);
    globalError.text('');
    const settings = {
        url,
        data,
        success,
        type: 'post',
        error: function () {
            globalError.text('An error has occurred. Please try again later.');
        },
        complete: function () {
            submitInput.prop('disabled', false);
        }
    };
    if (data instanceof FormData) {
        settings.processData = false;
        settings.contentType = false;
    }
    jquery_1.default.ajax(settings);
}
function handlePostRequestSerialize(selectorForm, url, success) {
    (0, jquery_1.default)(selectorForm).on('submit', function (e) {
        e.preventDefault();
        const data = (0, jquery_1.default)(this).serialize();
        handlePostRequest(selectorForm, url, data, success);
    });
}
exports.handlePostRequestSerialize = handlePostRequestSerialize;
function handlePostRequestFormData(selectorForm, url, success) {
    (0, jquery_1.default)(selectorForm).on('submit', function (e) {
        e.preventDefault();
        if (typeof this === "object" && this instanceof HTMLFormElement) {
            const data = new FormData(this);
            handlePostRequest(selectorForm, url, data, success);
        }
    });
}
exports.handlePostRequestFormData = handlePostRequestFormData;
