$(function(){
let modal = $("#myModal");

let btn = $("#explanationButton");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var coll = document.getElementsByClassName("collapsible button");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

$(document).ready(function () {
    SESSION.then(function(data) {
        $(".name-of-user").text(data.user.name)
    })    

    $(".searchbox").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(this).parent().parent().find('.tag-button').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$(document).ready(async () => {
    

    async function testScores() {
        await FYSCloud.API.queryDatabase(
            "DELETE FROM `tag_category_score` WHERE `tag_category_score`.`userId` BETWEEN 1 AND 1000000;"
        )

        let usersAndScores = [];

        for (let i = 0; i < 10; i++) {
            usersAndScores.push({
                userId: i,

                hobbys: Math.floor(Math.random() * Math.floor(20)),
                movies: Math.floor(Math.random() * Math.floor(20)),
                countries: Math.floor(Math.random() * Math.floor(20)),
                books: Math.floor(Math.random() * Math.floor(20)),
                music: Math.floor(Math.random() * Math.floor(20)),
                games: Math.floor(Math.random() * Math.floor(20)),
                sports: Math.floor(Math.random() * Math.floor(20)),
                languages: Math.floor(Math.random() * Math.floor(20))
            })
        }

        let insertValues = [];

        for (let userAndScores of usersAndScores) {
            insertValues.push("('" + userAndScores.userId + "', '" + userAndScores.hobbys +
                "', '" + userAndScores.movies + "', '" + userAndScores.countries + "', '" +
                userAndScores.books + "', '" + userAndScores.music + "', '" + userAndScores
                .games + "', '" + userAndScores.sports + "', '" + userAndScores.languages +
                "')");
        }

        await FYSCloud.API.queryDatabase(
            "INSERT INTO tag_category_score (userId, hobbys, movies, countries, books, music, games, sports, languages) VALUES " +
            insertValues.join(", ")
        );
    }

    let categories_and_tags = {};

    let tag_category = await FYSCloud.API.queryDatabase("SELECT * FROM `tag_category`;");

    let tag_to_id = {};
    let id_to_tag = {};
    let tag_to_category = {};

    for (let category of tag_category) {
        let category_tags = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `tag` WHERE `categoryId` = " + category.id + ";");

        categories_and_tags[category.name] = category_tags.reduce(function (tagNamen, tag) {
            tagNamen.push(tag.name);

            tag_to_id[tag.name] = tag.id;
            id_to_tag[tag.id] = tag.name;

            tag_to_category[tag.name] = tag_to_category[tag.name] || "";
            tag_to_category[tag.name] = category.name;

            return tagNamen;
        }, []);
    }

    async function updateTags() {
        let geselecteerdeTags = $(".scroll-current-tags .tag-button");

        await FYSCloud.API.queryDatabase(
            "DELETE FROM `user_tag` WHERE `user_tag`.`userId` = " + userId + ";")

        if (geselecteerdeTags.length == 0) {
            return;
        }

        let insertValues = [];

        let tag_category_score = {
            hobbys: 0,
            music: 0,
            movies: 0,
            games: 0,
            countries: 0,
            sports: 0,
            books: 0,
            languages: 0
        };


        for (let tag of geselecteerdeTags) {
            insertValues.push("('" + userId + "', '" + tag_to_id[$(tag).text()] + "')");
            tag_category_score[tag_to_category[$(tag).text()].toLowerCase()]++;
        }

        await FYSCloud.API.queryDatabase(
            "INSERT INTO user_tag (userId, tagId) VALUES " + insertValues.join(", ")
        );

        await FYSCloud.API.queryDatabase(
            "DELETE FROM `tag_category_score` WHERE `userId` = " + userId + ";"
        );

        await FYSCloud.API.queryDatabase(
            "INSERT INTO `tag_category_score` (userId, hobbys, music, movies, games, countries, sports, books, languages) VALUES (" +
            userId + ", " + tag_category_score.hobbys + ", " + tag_category_score.music +
            ", " + tag_category_score.movies + ", " + tag_category_score.games + ", " +
            tag_category_score.countries + ", " + tag_category_score.sports + ", " +
            tag_category_score.books + ", " + tag_category_score.languages + ");"
        );
    }

    let userId = (await SESSION).user.id;

    let geselecteerdeTags = await FYSCloud.API.queryDatabase(
        "SELECT * FROM `user_tag` WHERE `userId` = " + userId + ";");
    geselecteerdeTags = geselecteerdeTags.reduce(function (tagNamen, tag) {
        tagNamen.push(id_to_tag[tag.tagId]);
        return tagNamen;
    }, []);

    if (geselecteerdeTags.length) {
        $(".tag-counter").text(geselecteerdeTags.length);
        $(".js-help-text").hide();
    }

    for (let tag of geselecteerdeTags) {
        $(".scroll-current-tags").append('<button class="tag-button">' + tag + '</button>');
    }

    for (let categorie of Object.keys(categories_and_tags)) {
        for (let tag of categories_and_tags[categorie]) {
            if (geselecteerdeTags.includes(tag)) {
                continue;
            }

            $('.content.content-' + categorie.toLowerCase()).append($('<button>').addClass('tag-button').html(tag))
        }
    }

    async function saveTags() {
        await FYSCloud.API.queryDatabase(
            "TRUNCATE TABLE `tag`")

        await FYSCloud.API.queryDatabase(
            "TRUNCATE TABLE `tag_category`")

        for (let categorie of Object.keys(categories_and_tags)) {

            let categorieId = (await FYSCloud.API.queryDatabase(
                "INSERT INTO tag_category (name) VALUES ('" + categorie + "')"
            )).insertId

            let insertValues = [];

            for (let tag of categories_and_tags[categorie]) {
                insertValues.push("('" + tag + "', '" + categorieId + "')");
            }

            await FYSCloud.API.queryDatabase(
                "INSERT INTO tag (name, categoryId) VALUES " + insertValues.join(", ")
            )
        }
    };

    $("body").on('click', ".content .tag-button", function (e) {
        $(".tag-counter").text(
            $(".scroll-current-tags .tag-button").length + 1
        );

        let tag = $(this).text();
        $(".scroll-current-tags").append('<button class="tag-button">' + tag + '</button>');
        $('.js-help-text').hide();
        $(this).detach();

        updateTags();
    });

    $("body").on("click", ".scroll-current-tags .tag-button", function (e) {
        let t = $(this).text();
        let categorie = "";

        CAT_KEYS:
            for (let cat of Object.keys(categories_and_tags)) {
                for (let tag of categories_and_tags[cat]) {
                    if (tag == t) {
                        categorie = cat;
                        break CAT_KEYS;
                    }
                }
            }

        $(".content.content-" + categorie.toLowerCase()).append(
            '<button class="tag-button">' + t + '</button>');

        $(this).detach();

        $(".tag-counter").text(
            $(".scroll-current-tags .tag-button").length
        );

        if (!$(".scroll-current-tags .tag-button").length) {
            $('.js-help-text').show();
        }

        updateTags();
    });
});
});
