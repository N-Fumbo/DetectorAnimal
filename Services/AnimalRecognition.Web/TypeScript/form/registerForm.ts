import $ from 'jquery';
import "jquery-validation";
import "jquery-validation-unobtrusive";
import Notification from '../Notification';
import ModalWindow from '../ModalWindow';
import { RequestResult } from '../additional'

function submit() {

    const globalErrorRegister = $(`#form_register .form_global_error`);

    $('#form_register').on('submit', function (e) {
        e.preventDefault();

        const formData = $(this).serialize();

        const submitInput = $(this).find('input[type="submit"]');
        submitInput.prop('disabled', true);

        globalErrorRegister.text('');

        $.ajax({
            url: 'Account/Register',
            type: 'post',
            data: formData,
            success: function (result: RequestResult) {
                if (result.success) {
                    const modalWindowRegister = new ModalWindow('#modal_window_register');
                    modalWindowRegister.close();
                    const notification = new Notification($('#account_created'));
                    notification.show(8000);
                }
                else {
                    if (result.errors) {
                        result.errors.forEach(error => {
                            if (error.key !== '') {
                                $(`#form_register span[data-valmsg-for='${error.key}']`).text(error.errorMessage);
                            }
                            else {
                                globalErrorRegister.text(error.errorMessage);
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