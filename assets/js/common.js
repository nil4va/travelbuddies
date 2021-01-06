$(document).ready(function () {
    SESSION.then(function (sessionData) {
        let user = sessionData.user;
        let usernameElement = $('<span>').text(user.name);

        if (user.admin === 1) {
            usernameElement.append(
                $('<span>')
                    .text(' (admin)')
                    .addClass('text-danger')
            )
        }

        $('.js-navbar-username').append(usernameElement);

    }).catch(function (reason) {
        if (reason === SessionEnum.ERROR_NOT_LOGGED_IN) {
            window.location.replace('/');
        }
    });
});
