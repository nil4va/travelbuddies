$(document).ready(function () {

    let $userRepository = new UserRepository;

    $session.then(function (data) {
        // Redirect already logged in.
        window.location.replace('/matches.html');
    })

    const urlParameters = new URLSearchParams(window.location.search);
    const resetToken = urlParameters.get('token');
    if (resetToken === null) {
        // No reset link
        window.location.replace('/');
    }

    $('.js-reset-token').val(resetToken);

    $(document).on('submit', '#reset-form', function (event) {
        event.preventDefault();

        let password = $(this).find('.js-password').val();

        let databaseUser = $userRepository.getFirstByPasswordResetToken(resetToken)
        databaseUser.then(function (data) {
            let firstRecord = data[0];

            if (firstRecord === undefined) {
                alert('No account exists with this reset token');
                return;
            }

            $userRepository.updatePasswordByPasswordResetToken(resetToken, password).then(result => {
                alert('Your password has been updated, you can now login.');
                window.location.replace('/');
            });
        });
    });
});
