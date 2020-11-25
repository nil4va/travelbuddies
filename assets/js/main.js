$(document).ready(function () {
    // Handle clicking on the avatar for the chat.
    $(document.body).on('click', '.chatbox-avatar', function () {
        $('#chatbox').toggleClass('open');
    });
});
