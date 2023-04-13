"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
function preview() {
    const imageInput = (0, jquery_1.default)('#image_input');
    const imagePreview = (0, jquery_1.default)('#image_preview');
    imageInput.on('change', function () {
        if ((this === null || this === void 0 ? void 0 : this.files) && this.files[0]) {
            const selectedFile = this.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview.attr('src', reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    });
}
function submit() {
    preview();
    const recognitionResult = (0, jquery_1.default)('#recognition_result');
    const globalError = (0, jquery_1.default)(`#form_recognition .form_global_error`);
    (0, jquery_1.default)('#form_recognition').on('submit', function (e) {
        e.preventDefault();
        if (typeof this === "object" && this instanceof HTMLFormElement) {
            const formData = new FormData(this);
            const submitInput = (0, jquery_1.default)(this).find('input[type="submit"]');
            submitInput.prop('disabled', true);
            globalError.text('');
            recognitionResult.text('');
            jquery_1.default.ajax({
                url: 'Recognition/RecognitionImage',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.success) {
                        recognitionResult.text(`Entity: ${result.entity}. Percent: ${result.percent}`);
                    }
                    else {
                        if (result.errors) {
                            result.errors.forEach(error => {
                                globalError.text(error.errorMessage);
                            });
                        }
                    }
                    submitInput.prop('disabled', false);
                },
                error: function () {
                    submitInput.prop('disabled', false);
                }
            });
        }
    });
}
exports.default = submit;
