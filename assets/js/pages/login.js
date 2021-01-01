$(document).ready(function () {

    let userRepository = new UserRepository;
    let SESSIONInserter = new sessionInserter;

    SESSION.then(function(data) {
        // Redirect already logged in.
        window.location.replace('/matches.html');
    })

    $(document).on('submit', '#login-form', function (event) {
        event.preventDefault();

        let email = $(this).find('.js-email').val();
        let password = $(this).find('.js-password').val();
        
        let databaseUser = userRepository.getFirstByEmail(email)
        databaseUser.then(function(data) {
            let loginValid = false;
            let firstRecord = data[0];

            if (firstRecord !== undefined) {
                if (password === firstRecord.password) {
                    loginValid = true;
                }
            }

            if (loginValid === false) {
                alert('Login failed.')
                return;
            }

            // Create session
            let sessionToken = generateRandomStringRounds(2);
            SESSIONInserter.insertSession(firstRecord.id, sessionToken);
            setCookie(SessionEnum.SESSION_COOKIE_NAME, sessionToken, 7);

            // Redirect to matches
            window.location.replace('/matches.html');
        });
    });
});
