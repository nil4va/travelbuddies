$(document).ready(function () {
    updateNavbarUser();

    // Logout button on all pages
    $(document).on('click', '.js-navbar-logout', () => {
        removeCookie(SessionEnum.SESSION_COOKIE_NAME);
        window.location.replace('/');
        return;
    });
});

function updateNavbarUser() {
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

        let navbarUser = $('.js-navbar-username');
        navbarUser.empty();
        navbarUser.append(usernameElement);

    }).catch(function (reason) {
        if (reason === SessionEnum.ERROR_NOT_LOGGED_IN) {
            window.location.replace('/');
        }
    });
}

function goBack() {
    window.history.back();
}
