import $ from 'jquery';

import working from "./working engine/working";

const preloader = (isUserAuthorized: boolean): void => {
    const preloader = $('#preloader');
    const percent = $('#percent_preloader');
    const mediaFiles: JQuery<HTMLImageElement> = $('img');

    if (preloader !== null && percent !== null) {
        let countLoadImages = 0;
        const updateInfoPreloader = (): void => {
            countLoadImages++;

            percent.text(`${((countLoadImages / mediaFiles.length) * 100).toFixed(1)}%`);

            if (countLoadImages === mediaFiles.length) {
                percent.text('100%');
                preloader.fadeOut(700);
                working(isUserAuthorized);
            }
        }

        if (mediaFiles.length > 0) {
            mediaFiles.each(function () {
                if (this.complete) {
                    updateInfoPreloader();
                }
                else {
                    this.onload = () => updateInfoPreloader();
                    this.onerror = () => updateInfoPreloader();
                }
            });
        }
        else {
            updateInfoPreloader();
        }
    }
}

export default preloader;