import $ from 'jquery';
import preloader from "./preloader";
import submitRecognitionForm from './form/recognitionForm'
import ModalWindow from './ModalWindow';

$(() => {
    submitRecognitionForm();

    const modalWindowLogIn = new ModalWindow('#modal_window_recognition');
    $('#recognition').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.open();
    });

    $('#modal_window_recognition .modal_window_close').on('click', function (e) {
        e.preventDefault();
        if (modalWindowLogIn !== null) modalWindowLogIn.close();
    });

    preloader(true);
});
