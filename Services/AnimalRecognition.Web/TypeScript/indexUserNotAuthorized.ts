import $ from 'jquery';
import "jquery-validation";
import "jquery-validation-unobtrusive";
import ModalWindow from './ModalWindow';
import preloader from "./preloader";
import submitRegisterForm from './form/register';
import submitLogInForm from './form/login';


function initializeModals() {
    const modalWindowPrivacy = new ModalWindow('#modal_window_privacy');
    const modalWindowLogIn = new ModalWindow('#modal_window_login');
    const modalWindowRegister = new ModalWindow('#modal_window_register');
    const modalWindowDetect = new ModalWindow('#modal_window_recognition');

    $('#privacy').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.open();
    });

    $('#modal_window_privacy .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.close();
    });
    $('#login').on('click', function (e) {
        e.preventDefault();
        modalWindowLogIn.open();
    });

    $('#modal_window_login .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowLogIn.close();
    });
    $('#register').on('click', function (e) {
        e.preventDefault();
        modalWindowRegister.open();
    });

    $('#modal_window_register .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowRegister.close();
    });

    $('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowDetect.close();
    });
    
}

function initializeForms() {
    submitRegisterForm();
    submitLogInForm();
}

$(() => {
    initializeModals();
    initializeForms();
    preloader(false);
})