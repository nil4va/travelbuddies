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
        let variables = element.data('variables');

        $.get('/layout/include/' + file + '.html', function (data) {

            if (variables instanceof Object) {
                // Replace the placeholders with the data from the JSON object.
                for (const [key, value] of Object.entries(variables)) {
                    data = data.replace('{{ ' + key  + ' }}', value);
                }
            }

            // Inject the content into the page, and remove the (unneeded) div.
            element.after(data);
            element.remove();
        });
    }
});
