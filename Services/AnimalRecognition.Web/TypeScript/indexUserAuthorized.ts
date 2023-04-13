import $ from 'jquery';
import preloader from "./preloader";
import submitRecognitionForm from './form/recognitionForm'
import ModalWindow from './ModalWindow';

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

    const modalWindowLogIn = new ModalWindow('#modal_window_recognition');
    $('#recognition').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.open();
    });

    $('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.close();
    });

    submitRecognitionForm();

    preloader(true);
});
