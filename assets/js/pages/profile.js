$(document).ready(function () {

    let $userRepository = new UserRepository;

    $session.then(function (data) {
        // User has session
        sessionUser = data.user;

        updateAvatar(sessionUser.profilePictureUrl);

        $('.js-display-name').text(sessionUser.firstName + ' ' + sessionUser.lastName);

        $(document).on('submit', '#profile-image-form', function (event) {
            event.preventDefault();

            let file = $(this).find('.js-file');
            let fileExtension = file.val().split('.').pop().toLowerCase();

            let allowedExtensions = ['jpeg', 'jpg', 'png'];
            if ($.inArray(fileExtension, allowedExtensions) === -1) {
                alert('The extension is not allowed, please upload one of the following: ' + allowedExtensions.join(', '));
                return;
            }

            let fileLocation = '/storage/usercontent/' + sessionUser.id + '/' + generateRandomString() + '.' + fileExtension;

            FYSCloud.Utils
                .getDataUrl(file)
                .done(function (data) {
                    FYSCloud.API.uploadFile(
                        fileLocation,
                        data.url
                    ).done(function (url) {
                        $userRepository.updateProfilePictureUrl(sessionUser.id, url);
                        updateAvatar(url);

                        // Remove modal
                        $("#avatarUpload").modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    }).fail(function (reason) {

                    });
                }).fail(function (reason) {

                });
        });

    }).catch(reason => {
        if (reason === SessionEnum.ERROR_NOT_LOGGED_IN) {
            window.location.replace('/');
        }
    });

    function updateAvatar(avatarUrl) {
        console.log(avatarUrl)
        if (avatarUrl === '') {
            return;
        }
        let avatar = $('.js-avatar');
        avatar.attr('src', avatarUrl);
    }
});
