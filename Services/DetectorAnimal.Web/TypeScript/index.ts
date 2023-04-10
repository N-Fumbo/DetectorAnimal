import preloader from "./preloader";
import $ from 'jquery';
import submitRegisterForm from './form/registerForm';
import ModalWindow from './ModalWindow';

$(() => {
    const modalWindowLogIn = new ModalWindow('#modal_window_login');
    $('#login').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.open();
    });

    $('#modal_window_login .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.close();
    });

    const modalWindowRegister = new ModalWindow('#modal_window_register');
    $('#register').on('click', function (e) {
        e.preventDefault();
        if (modalWindowRegister !== null) modalWindowRegister.open();
    });

    $('#modal_window_register .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowRegister !== null) modalWindowRegister.close();
    });

    const modalWindowDetect = new ModalWindow('#modal_window_detect');

    $('#modal_window_detect .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowDetect !== null) modalWindowDetect.close();
    });

    submitRegisterForm();

    preloader();
})