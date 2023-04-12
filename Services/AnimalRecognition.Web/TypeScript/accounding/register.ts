import $ from 'jquery';

$(() => {
    $('#form_register').on('submit', function (e) {
        e.preventDefault();

        const formData = $(this).serialize();
        console.log(formData);
    });
})