import $ from 'jquery';
import Notification from '../Notification';
import ModalWindow from '../ModalWindow';
import { RequestResult } from '../additional'
import { handlePostRequestSerialize } from './common';

function submit() {
    handlePostRequestSerialize('#form_register', 'Account/Register', true, function (result: RequestResult) {
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
                        $(`#form_register .form_global_error`).text(error.errorMessage);
                    }
                });
            }
        }
    })
}

export default submit;