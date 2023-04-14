"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const common_1 = require("./common");
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
    (0, common_1.handlePostRequestFormData)('#form_recognition', 'Recognition/RecognitionImage', function (result) {
        if (result.success) {
            recognitionResult.text(`Entity: ${result.entity}. Percent: ${result.percent}`);
        }
        else {
            if (result.errors) {
                result.errors.forEach(error => {
                    (0, jquery_1.default)(`#form_recognition .form_global_error`).text(error.errorMessage);
                });
            }
        }
    });
}
exports.default = submit;
