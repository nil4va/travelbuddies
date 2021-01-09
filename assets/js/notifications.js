let showing = false;

async function update() {
    if (showing) {
        return;
    }

    if (window.location.href.includes("/matches.html")) {
        return;
    }

    let userId = (await SESSION).user.id;

    let outstanding = await FYSCloud.API.queryDatabase(
        "SELECT * FROM `user_match` WHERE `otherUserId` = ? AND `otherUserAccepted` = 0 AND `otherUserDeclined` = 0;", [ userId ]
    );

    if (outstanding.length > 0) {

        let notificationElement = $('<div>')
            .addClass('card')
            .append(
                $('<div>')
                    .addClass('card-body')
                    .addClass('bg-gray')
                    .addClass('text-center')
                    .append(
                        $('<h5>')
                            .addClass('card-title')
                            .addClass('text-black')
                            .text('Matches')
                    )
                    .append(
                        $('<p>')
                            .addClass('card-text')
                            .addClass('text-muted')
                            .text('Andere gebruikers zijn geinteresseerd. Klik om naar matches te gaan!')
                    )
                    .append(
                        $('<a>')
                            .attr('href', '/matches.html')
                            .addClass('btn')
                            .addClass('btn-primary')
                            .addClass('btn-sm')
                            .text('Meer details...')
                    )
            )

        $("#notifications").append(notificationElement);

        showing = true;
    }
}

$(document).ready(() => {
    update();
    setInterval(update, 5000);
});
