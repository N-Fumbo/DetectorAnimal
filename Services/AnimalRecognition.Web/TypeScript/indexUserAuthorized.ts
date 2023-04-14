import $ from 'jquery';
import preloader from "./preloader";
import submitRecognitionForm from './form/recognition'
import ModalWindow from './ModalWindow';

function initializeModals() {
    const modalWindowPrivacy = new ModalWindow('#modal_window_privacy');
    const modalWindowLogIn = new ModalWindow('#modal_window_recognition');

    $('#privacy').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.open();
    });

    $('#modal_window_privacy .modal_window_close').on('click', function (e) {
        e.preventDefault();
        modalWindowPrivacy.close();
    });
    $('#recognition').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.open();
    });

    $('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.close();
    });
}

function initializeForms() {
    submitRecognitionForm();
}

$(() => {
    initializeModals();
    initializeForms();

    preloader(true);
});
