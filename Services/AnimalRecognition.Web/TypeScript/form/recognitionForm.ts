import $ from 'jquery';
import { RequestRecognitionResult } from '../additional'

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
    const globalError: JQuery<HTMLInputElement> = $(`#form_recognition .form_global_error`);

    $('#form_recognition').on('submit', function (e) {
        e.preventDefault();
        if (typeof this === "object" && this instanceof HTMLFormElement) {

            const formData = new FormData(this);

            const submitInput = $(this).find('input[type="submit"]');
            submitInput.prop('disabled', true);

            globalError.text('');
            recognitionResult.text('');

            $.ajax({
                url: 'Recognition/RecognitionImage',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (result: RequestRecognitionResult) {
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
            })
        }
    });
}

export default submit;