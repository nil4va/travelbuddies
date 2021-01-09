$(document).ready(async () => {
    let userId = (await SESSION).user.id;
    let totalTagsOfUser = (
        await FYSCloud.API.queryDatabase(
            "SELECT COUNT(*) AS totaal FROM `user_tag` WHERE `userId`= ?",
            [userId]
        )
    )

    $("#totalTags").text(totalTagsOfUser[0].totaal);

});


$(document).ready(async () => {
    let userId = (await SESSION).user.id;
    let otherUserId = -1;

    let matchIds = [];
    let matchPotentials = [];

    function calculateAge(birthday) {
        let ageDifMs = Date.now() - birthday;
        let ageDate = new Date(ageDifMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    async function resetPage() {
        $("#match_potential .card-potential-buddy").detach();
        $("#matches_approved .card.mb-3").detach();
    }

    async function updateMatches() {
        let ourUserOutstandingMatches = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user_match` WHERE `userId` = ? AND `otherUserAccepted` = 0 AND `otherUserDeclined` = 0;",
            [userId]
        );

        let otherUserAcceptedMatches = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user_match` WHERE `userId` = ? AND `otherUserAccepted` = 1;",
            [userId]
        );

        let ourUserAcceptedMatches = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user_match` WHERE `otherUserId` = ? AND `otherUserAccepted` = 1;",
            [userId]
        );

        matchIds = ourUserAcceptedMatches.concat(otherUserAcceptedMatches);

        matchIds = Array.from(
            new Set(
                matchIds.reduce((matchIds, match) => {
                    if (match.userId == userId) {
                        matchIds.push(match.otherUserId);
                    } else {
                        matchIds.push(match.userId);
                    }

                    return matchIds;
                }, [])
            )
        );

        renderMatches();

        let otherUserDeclinedMatches = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user_match` WHERE `userId` = ? AND `otherUserDeclined` = 1;", [userId]
        );

        let ourUserDeclinedMatches = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user_match` WHERE `otherUserId` = ? AND `otherUserDeclined` = 1;", [userId]
        );

        let declinedIds = ourUserDeclinedMatches.concat(otherUserDeclinedMatches);

        declinedIds = Array.from(
            new Set(
                declinedIds.reduce((matchIds, match) => {
                    if (match.userId == userId) {
                        matchIds.push(match.otherUserId);
                    } else {
                        matchIds.push(match.userId);
                    }
                    return matchIds;
                }, [])
            )
        );

        let excludeIds = matchIds.concat(declinedIds);

        // Make sure that the user cannot match with themselves.
        excludeIds.push(userId);

        excludeIds = excludeIds.concat(
            ourUserOutstandingMatches.reduce((acc, { otherUserId }) => {
                acc.push(otherUserId);
                return acc;
            }, [])
        );

        let excludeValues = [];

        for (let excludeId of excludeIds) {
            excludeValues.push("`userId` != " + excludeId);
        }

        let tag_category_score = (await FYSCloud.API.queryDatabase(
            "SELECT * FROM `tag_category_score` WHERE `userId` = ?;",
            [userId]
        ))[0];

        matchPotentials = Array.from(
            await FYSCloud.API.queryDatabase(
                "SELECT * FROM `tag_category_score`" + (excludeValues.length ? " WHERE " + excludeValues.join(" AND ") + " " : " ") + "ORDER BY ABS(hobbys - ?), ABS(movies - ?), ABS(countries - ?), ABS(books - ?), ABS(music - ?), ABS(games - ?), ABS(sports - ?), ABS(languages - ?);",
                [tag_category_score.hobbys, tag_category_score.movies, tag_category_score.countries, tag_category_score.books, tag_category_score.music, tag_category_score.games, tag_category_score.sports, tag_category_score.languages]
            )
        );

        otherUserId = matchPotentials.length > 0 ? matchPotentials[0].userId : -1;
    }

    async function renderPotentialMatch() {
        if (otherUserId === -1) {
            return;
        }

        let otherUser = (await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user` WHERE `id` = ?;",
            [matchPotentials[0].userId]
        ))[0];

        let avatarUrl = otherUser.profilePictureUrl;
        if (avatarUrl === null || avatarUrl === '') {
            avatarUrl = '/assets/img/profile/girl.jpg';
        }

        let age = calculateAge(new Date(otherUser.birthDate));

        let avatarElement = $('<div>')
            .addClass('card')
            .addClass('card-potential-buddy')
            .addClass('js-profile-modal')
            .attr('data-name', otherUser.firstName + ' ' + otherUser.lastName)
            .attr('data-avatar', otherUser.profilePictureUrl)
            .attr('data-mail', otherUser.email)
            .attr('data-phone', otherUser.phone)
            .attr('data-bio', otherUser.biography)
            .attr('data-nationality', otherUser.nationality)
            .append(
                $('<div>')
                    .addClass('card')
                    .addClass('mb-3')
            )
            .append(
                $('<img>')
                    .addClass('card-img-top')
                    .attr('src', avatarUrl)
            )
            .append(
                $('<div>')
                    .addClass('card-body')
                    .append(
                        $('<h5>')
                            .addClass('card-title')
                            .text(otherUser.firstName + ' (' + age + ')')
                    )
                    .append(
                        $('<p>')
                            .addClass('card-text')
                            .text(otherUser.biography)
                    )
                    .append(
                        $('<div>')
                            .addClass('row')
                            .append(
                                $('<div>')
                                    .addClass('col-md-6')
                                    .append(
                                        $('<a>')
                                            .addClass('btn')
                                            .addClass('btn-success')
                                            .addClass('btn-block')
                                            .text('Interesse')
                                    )
                            )
                            .append(
                                $('<div>')
                                    .addClass('col-md-6')
                                    .append(
                                        $('<a>')
                                            .addClass('btn')
                                            .addClass('btn-danger')
                                            .addClass('btn-block')
                                            .text('Geen Interesse')
                                    )
                            )
                    )
            )

        $("#match_potential h3").after(avatarElement);
    }

    $(document).on('click', '.js-profile-modal', (event) => {
        let avatarElement = $(event.currentTarget);

        let mail = avatarElement.data('mail');
        let avatar = avatarElement.data('avatar');
        let name = avatarElement.data('name');
        let phone = avatarElement.data('phone');
        let bio = avatarElement.data('bio');
        let nationality = avatarElement.data('nationality');

        if (mail === undefined) {
            mail = '';
        }
        if (avatar === undefined) {
            avatar = '/assets/img/profile-female.jpg';
        }
        if (name === undefined) {
            name = '';
        }
        if (phone === undefined) {
            phone = '';
        }
        if (avatar === undefined) {
            avatar = '';
        }        
        if (bio === undefined) {
            bio = '';
        }        
        if (nationality === undefined) {
            nationality = '';
        }

        $('.js-profile-modal-mail').text(mail);
        $('.js-profile-modal-avatar').attr('src', avatar);
        $('.js-profile-modal-name').text(name);
        $('.js-profile-modal-phone').text(phone);
        $('.js-profile-modal-bio').text(bio);
        $('.js-profile-modal-nationality').text(nationality);

        $('#profileModal').modal('toggle');
    });

    async function renderMatches() {
        for (let matchId of matchIds) {
            let matchUser = (await FYSCloud.API.queryDatabase(
                "SELECT * FROM `user` WHERE `id` = ?;",
                [matchId]
            ))[0];

            let age = calculateAge(new Date(matchUser.birthDate));
            let matchNameAndAge = matchUser.firstName + " (" + age + ")";

            let avatarUrl = matchUser.profilePictureUrl;
            if (avatarUrl === null || avatarUrl === '') {
                avatarUrl = '/assets/img/profile/girl.jpg';
            }

            let avatarElement = $('<div>')
                .addClass('card')
                .addClass('mb-3')
                .addClass('js-profile-modal')
                .attr('data-name', matchUser.firstName + ' ' + matchUser.lastName)
                .attr('data-avatar', matchUser.profilePictureUrl)
                .attr('data-mail', matchUser.email)
                .attr('data-phone', matchUser.phone)
                .attr('data-bio', matchUser.biography)
                .attr('data-nationality', matchUser.nationality)
                .append($('<img>')
                    .addClass('card-img-top')
                    .attr('src', avatarUrl)
                    .attr('alt', 'Avatar')
                )
                .append($('<div>')
                    .addClass('card-body')
                    .append($('<h5>')
                        .addClass('card-title')
                        .text(matchNameAndAge)
                    )
                );

            $("#matches_approved").find("h3").after(avatarElement);
        }
    }

    async function updateMatchState(approved) {
        let match_exists = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `user_match` WHERE `userId` = ? AND `otherUserId` = ?;",
            [otherUserId, userId]
        );

        if (match_exists.length > 0) {
            await FYSCloud.API.queryDatabase(
                "UPDATE `user_match` SET `otherUserAccepted` = ?, `otherUserDeclined` = ? WHERE `userId` = ? AND `otherUserId` = ?;",
                [Number(approved), Number(!approved), otherUserId, userId]
            );
        } else {
            await FYSCloud.API.queryDatabase(
                "INSERT INTO `user_match` (userId, otherUserId, otherUserAccepted, otherUserDeclined) VALUES (?, ?, false, ?);",
                [userId, otherUserId, !approved]
            );
        }
    }

    async function update() {
        await resetPage();
        await updateMatches();
        await renderPotentialMatch();
    }

    $("body").on("click", "a.btn", async e => {
        let approved = $(e.currentTarget).hasClass("btn-success");
        await updateMatchState(approved);
        await update();
    });

    await update();
});