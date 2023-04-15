import $ from 'jquery';

function handlePostRequest(selectorForm: string, url: string, data: string | FormData, checkIsValid: boolean, success: any) {
    const globalError = $(`${selectorForm} .form_global_error`);
    const submitInput = $(`${selectorForm} input[type="submit"]`);
    const loader = $(`${selectorForm} .form_loading_container`);

    globalError.text('');

    if (checkIsValid === false || $(selectorForm).valid()) {
        const settings: any = {
            url,
            data,
            success,
            type: 'post',
            beforeSend: function () {
                submitInput.prop('disabled', true);
                if (loader.length > 0) {
                    loader.fadeIn(500);
                }
            },
            error: function () {
                globalError.text('An error has occurred. Please try again later.');
            },
            complete: function () {
                if (loader.length > 0) {
                    loader.fadeOut(500);
                }
                submitInput.prop('disabled', false);
            }
        };

        if (data instanceof FormData) {
            settings.processData = false;
            settings.contentType = false;
        }

        $.ajax(settings);
    }
}

function handlePostRequestSerialize(selectorForm: string, url: string, checkIsValid: boolean, success: any) {
    $(selectorForm).on('submit', function (e) {
        e.preventDefault();
        const data = $(this).serialize();

        handlePostRequest(selectorForm, url, data, checkIsValid, success);
    });
}

function handlePostRequestFormData(selectorForm: string, url: string, checkIsValid: boolean, success: any) {
    $(selectorForm).on('submit', function (e) {
        e.preventDefault();
        if (typeof this === "object" && this instanceof HTMLFormElement) {
            const data = new FormData(this);

            handlePostRequest(selectorForm, url, data, checkIsValid, success);
        }
    });
}

export { handlePostRequestSerialize, handlePostRequestFormData };