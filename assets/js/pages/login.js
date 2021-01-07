$(document).ready(function () {

    let userRepository = new UserRepository;
    let SESSIONInserter = new sessionInserter;

    SESSION.then(function (data) {
        // Redirect already logged in.
        window.location.replace('/matches.html');
    })

    // generate random number for captcha
    let num1 = $("#num1");
    let num2 = $("#num2");

    num1.text(Math.floor(Math.random() * 10));
    num2.text(Math.floor(Math.random() * 10));

    let number1 = parseInt(num1.text());
    let number2 = parseInt(num2.text());

    let captchaResult = $("#captchaInputVal");

    $(document).on('submit', '#login-form', function (event) {
        event.preventDefault();
        
        // calculate captcha IF answer is wrong, alert and return.
        if (parseInt(captchaResult[0].value) !== (number1 + number2)) {
            alert("Failed Captcha");
            return;
        }

        let email = $(this).find('.js-email').val();
        let password = $(this).find('.js-password').val();
        let databaseUser = userRepository.getFirstByEmail(email)
        databaseUser.then(function (data) {
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
            setTimeout(function(){ 
               window.location.replace('/matches.html');
            }, 500);
        });
    });
});
