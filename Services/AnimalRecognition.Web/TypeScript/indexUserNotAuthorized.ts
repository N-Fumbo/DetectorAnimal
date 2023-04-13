import $ from 'jquery';
import ModalWindow from './ModalWindow';
import preloader from "./preloader";
import submitRegisterForm from './form/registerForm';
import submitLogInForm from './form/logInForm';

$(() => {

    const modalWindowPrivacy = new ModalWindow('#modal_window_privacy');
    $('#privacy').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.open();
    });

    $('#modal_window_privacy .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.close();
    });

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

    const modalWindowDetect = new ModalWindow('#modal_window_recognition');

    $('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowDetect.close();
    });

    submitRegisterForm();
    submitLogInForm();

    preloader(false);
})