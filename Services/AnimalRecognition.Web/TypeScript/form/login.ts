import $ from 'jquery';
import { RequestResult } from '../additional'
import { handlePostRequestSerialize } from './common';

function submit() {
    handlePostRequestSerialize('#form_login', 'Account/LogIn', true, function (result: RequestResult) {
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
                        $('#form_login .form_global_error').text(error.errorMessage);
                    }
                });
            }
        }
    });
}

export default submit;