$(document).ready(function () {

    let userRepository = new UserRepository;

    SESSION.then(function (data) {
        // Redirect already logged in.
        window.location.replace('/matches.html');
    })

    $(document).on('submit', '#forgot-form', function (event) {
        event.preventDefault();

        let email = $(this).find('.js-email').val();

        let databaseUser = userRepository.getFirstByEmail(email)
        databaseUser.then(function (data) {
            let firstRecord = data[0];

            if (firstRecord === undefined) {
                alert('No account with that email exists');
                return;
            }

            let token = generateRandomString();
            let link = window.location.protocol + '//' + window.location.hostname + '/reset.html?token=' + token;

            let mailContent = [
                'Hi ' + firstRecord.name + ',',
                '',
                'Please click the link below to reset your password.',
                '',
                '<a href="' + link + '">Reset password</a>',
                '',
                'If the link does not work, copy & paste the following into your browser: ' + link
            ];

            userRepository.updatePasswordResetToken(firstRecord.id, token).then(result => {

                FYSCloud.API.sendEmail({
                    from: {
                        name: "Corendon: Travelbuddies",
                        address: "is107_4@fys.cloud"
                    },
                    to: [
                        {
                            name: firstRecord.name,
                            address: firstRecord.email
                        }
                    ],
                    subject: 'Your password reset link',
                    html: mailContent.join('<br/>')
                }).done(function (data) {
                    alert('Thanks! Please check your email.');
                    // Redirect to login
                    window.location.replace('/');
                }).fail(function (reason) {
                });
            })
        });
    });
});
