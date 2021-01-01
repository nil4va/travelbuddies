$(document).ready(function () {

    let userRepository = new UserRepository;

    SESSION.then(response => {
        // Already logged in
        window.location.replace('/matches.html');
    }).catch(reason => {
    });

    $(document).on('submit', '#register-form', function (event) {
        event.preventDefault();

        let firstName = $(this).find('.js-first-name').val();
        let lastName = $(this).find('.js-last-name').val();
        let username = $(this).find('.js-username').val();
        let email = $(this).find('.js-email').val();
        // Security? Hashing? Salting? We don't know what that is.
        let password = $(this).find('.js-password').val();
        let birthDate = $(this).find('.js-birthdate').val();

        userRepository.getFirstByEmail(email).then(result => {
            if (result.length !== 0) {
                alert('An user with this email already exists.');
                return;
            }

            userRepository.getFirstByUsername(username).then(result => {
                if (result.length !== 0) {
                    alert('A user with this username already exists.');
                    return;
                }

                userRepository.createUser(
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    birthDate
                );
                // Redirect to the login page.
                window.location.replace('/');
            });
        })
    });
});
