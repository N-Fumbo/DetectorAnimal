import ModalWindow from "./ModalWindow";
import preloader from "./preloader";
import $ from 'jquery';
import working from "./working engine/working";

interface Response {
    success: boolean;
    errors?: Error[];
}

interface Error {
    key: string;
    errorMessage: string;
}

$(() => {
    const modalWindowLogIn = new ModalWindow('#modal_window_login');
    $('#login').on('click', function (e) {
        e.preventDefault();
        modalWindowLogIn.open();
    });

    $('#modal_window_login .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowLogIn.close();
    });

    const modalWindowRegister = new ModalWindow('#modal_window_register');
    $('#register').on('click', function (e) {
        e.preventDefault();
        modalWindowRegister.open();
    });

    $('#modal_window_register .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowRegister.close();
    });

    const modalWindowDetect = new ModalWindow('#modal_window_detect');

    $('#modal_window_detect .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowDetect.close();
    });

    preloader();

    //$('#form_register').on('submit', function (e) {
    //    e.preventDefault();

    //    const formData = $(this).serialize();


    //    $.ajax({
    //        url: 'Account/Register',
    //        type: 'post',
    //        data: formData,
    //        success: function (result) {
    //            console.log(result);
    //            const response: Response | null = JSON.parse(result);
    //            if (response) {
    //                if (response.success) {
    //                    //Успешно
    //                }
    //                else if (response.errors) {
    //                    response.errors.forEach(error => {
    //                        $(`#form_register span.form_error[data-valmsg-for='${error.key}']`).text(error.errorMessage);
    //                    });
    //                }
    //                else {
    //                    //...
    //                }
    //            }
    //            else {
    //                //...
    //            }
    //        },
    //        error: function () {

    //        }
    //    })
    //});
})