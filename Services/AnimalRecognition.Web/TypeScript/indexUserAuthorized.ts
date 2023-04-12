import $ from 'jquery';
import preloader from "./preloader";
import submitRecognitionForm from './form/recognitionForm'

$(() => {
    submitRecognitionForm();
    preloader(true);
});
