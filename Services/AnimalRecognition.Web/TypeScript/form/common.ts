import $ from 'jquery';

function handlePostRequest(selectorForm: string, url: string, data: string | FormData, success: any) {
    const globalError = $(`${selectorForm} .form_global_error`);
    const submitInput = $(`${selectorForm} input[type="submit"]`);

    submitInput.prop('disabled', true);

    globalError.text('');

    const settings: any = {
        url,
        data,
        success,
        type: 'post',
        error: function () {
            globalError.text('An error has occurred. Please try again later.');
        },
        complete: function () {
            submitInput.prop('disabled', false);
        }
    };

    if (data instanceof FormData) {
        settings.processData = false;
        settings.contentType = false;
    }

    $.ajax(settings);
}

function handlePostRequestSerialize(selectorForm: string, url: string, success: any) {
    $(selectorForm).on('submit', function (e) {
        e.preventDefault();
        const data = $(this).serialize();

        handlePostRequest(selectorForm, url, data, success);
    });
}

function handlePostRequestFormData(selectorForm: string, url: string, success: any) {
    $(selectorForm).on('submit', function (e) {
        e.preventDefault();
        if (typeof this === "object" && this instanceof HTMLFormElement) {
            const data = new FormData(this);

            handlePostRequest(selectorForm, url, data, success);
        }
    });
}

export { handlePostRequestSerialize, handlePostRequestFormData };