SESSION.then(function(data) {
    console.log(data)
    $(".name-of-user").text(data.user.name)
})
