$(document).ready(function () {
    init();

    /**
     * Load .html files from the "layout/include" directory, 
     * this prevents us from having to copy & paste general files (header, footer, etc.).
     */
    function init() {
        let elements = $('.js-element-builder');

        elements.each(function (index, element) {
            fetchAndCreatePageElement(
                $(element)
            );
        });
    }

    function fetchAndCreatePageElement(element) {
        let file = element.data('file');

        $.get('/layout/include/' + file + '.html', function (data) {
            element.after(data);
            element.remove();

            updateElementBuilderLanguage();
            updateNavbarUser();
        });
    }
});

function updateElementBuilderLanguage() {
    // Translate included files
    let translationTexts = $('.js-element-builder-text');
    translationTexts.each(function (index) {
        let element = $(this);
        let name = element.data('name');
        let file = element.data('file');
        let value = element.text();

        let elementsToReplace = $('.js-element-builder-text-target');
        elementsToReplace.each(function (index) {
            let elementToReplace = $(this);

            let elementToReplaceName = elementToReplace.data('name');
            let elementToReplaceFile = elementToReplace.data('file');

            if (elementToReplaceName === name && elementToReplaceFile === file) {
                elementToReplace.text(value);
            }
        });
    });
}
