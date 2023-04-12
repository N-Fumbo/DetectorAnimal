import $ from 'jquery';
import "jquery-validation";
import "jquery-validation-unobtrusive";
import { RequestResult } from '../additional'

function submit() {
    $('#form_login').on('submit', function (e) {
        e.preventDefault();

        const formData = $(this).serialize();

        const submitInput = $(this).find('input[type="submit"]');
        submitInput.prop('disabled', true);

        $.ajax({
            url: 'Account/LogIn',
            type: 'post',
            data: formData,
            success: function (result: RequestResult) {
                $(`#form_login .form_global_error`).text('');
                if (result.success) {
                    location.reload();
                }
                else {
                    if (result.errors) {
                        result.errors.forEach(error => {
                            if (error.key !== '') {
                                $(`#form_login span[data-valmsg-for='${error.key}']`).text(error.errorMessage);
                            }
                            else {
                                $(`#form_login .form_global_error`).text(error.errorMessage);
                            }
                        });
                    }
                }

                submitInput.prop('disabled', false);
            },
            error: function () {
                submitInput.prop('disabled', false);
            }
        })
    });
}

export default submit;