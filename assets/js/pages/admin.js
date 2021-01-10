$(document).ready(async () => {
    let userRepository = new UserRepository;

    let user = (await SESSION).user;

    if (user.admin === 0) {
        window.location.replace('/matches.html');
        return;
    }

    let userSelector = $('.js-users');
    let users = await userRepository.getAll();

    $.each(users, function(index, user) {
        userSelector.append(
            $('<tr>')
                .append(
                    $('<td>')
                        .text('#' + user.id)
                )
                .append(
                    $('<td>')
                        .text(user.firstName + ' ' + user.lastName + ' (' + user.name + ')')
                )
                .append(
                    $('<td>')
                        .addClass('text-right')
                        .append(
                            $('<button>')
                                .addClass('btn')
                                .addClass('btn-sm')
                                .addClass('btn-danger')
                                .addClass('js-delete')
                                .attr('data-id', user.id)
                                .attr('data-translate', 'admin.delete')
                                .text('Verwijder')
                        )
                )
        )
    });
    updateTranslations();

    $(document).on('click', '.js-delete', (event) => {
        let buttonSelector = $(event.currentTarget);

        let userId = buttonSelector.data('id');
        if (userId === undefined) {
            alert('Something went wrong, the ID is missing.');
            return;
        }

        let removedPromise = userRepository.deleteById(userId);
        removedPromise.then(function() {

            // Remove table row
            buttonSelector.closest('tr').remove();
            alert('Done!');
            return;
        });
    });
});
