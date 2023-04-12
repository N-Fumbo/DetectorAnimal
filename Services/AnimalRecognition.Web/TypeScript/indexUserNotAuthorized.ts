import $ from 'jquery';
import ModalWindow from './ModalWindow';
import preloader from "./preloader";
import submitRegisterForm from './form/registerForm';
import submitLogInForm from './form/logInForm';

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

    const modalWindowDetect = new ModalWindow('#modal_window_recognition');

    $('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowDetect !== null) modalWindowDetect.close();
    });

    submitRegisterForm();
    submitLogInForm();

    preloader(false);
})