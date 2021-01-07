SESSION.then(function(data) {
    $(".name-of-user").text(data.user.name)
})

$(document).ready(async () => {
let userId = (await SESSION).user.id;
let totalTagsOfUser = (
    await FYSCloud.API.queryDatabase(
     "SELECT COUNT(*) AS totaal FROM `user_tag` WHERE `userId`= ?",
    [userId]))
    
    $("#totalTags").text(totalTagsOfUser[0].totaal);
});

