import $ from 'jquery';
import { RequestRecognitionResult } from '../additional'
import { handlePostRequestFormData } from './common';

function preview() {
    const imageInput: JQuery<HTMLInputElement> = $('#image_input');
    const imagePreview: JQuery<HTMLImageElement> = $('#image_preview');

    imageInput.on('change', function () {
        if (this?.files && this.files[0]) {
            const selectedFile: File = this.files[0];
            const reader: FileReader = new FileReader();
            reader.onload = () => {
                imagePreview.attr('src', reader.result as string);
            }

            reader.readAsDataURL(selectedFile);
        }
    });
}

function submit() {
    preview();

    const recognitionResult: JQuery<HTMLInputElement> = $('#recognition_result');

    handlePostRequestFormData('#form_recognition', 'Recognition/RecognitionImage', function (result: RequestRecognitionResult) {
        if (result.success) {
            recognitionResult.text(`Entity: ${result.entity}. Percent: ${result.percent}`);
        }
        else {
            if (result.errors) {
                result.errors.forEach(error => {
                    $(`#form_recognition .form_global_error`).text(error.errorMessage);
                });
            }
        }
    })
}

export default submit;