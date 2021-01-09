$(function () {
  $(document).ready(async () => {
    let userId = (await SESSION).user.id;
    let user = (await FYSCloud.API.queryDatabase(
      "SELECT * FROM `user` WHERE `id` = " + userId
    ))[0];

    function calculateAge(birthdate) {
      var ageDifMs = Date.now() - birthdate;
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    let leeftijd = calculateAge(new Date(user.birthDate));

    $("#profile-name-and-age").text(user.name + " (" + leeftijd + ")");

    $("#birthday").val(user.birthDate.split("T")[0]);
    $("#occupation").val(user.occupation);
    $("#biography").val(user.biography);
    $("#nationality").val(user.nationality);

    $("input").focusout(opslaan);
    async function opslaan() {
      let birthday = $("#birthday").val() || new Date().toDateString();
      let occupation = $("#occupation").val();
      let biography = $("#biography").val();
      let nationality = $("#nationality").val();

      await FYSCloud.API.queryDatabase(

        "UPDATE user SET birthDate = ?, occupation = ?, biography = ?, nationality = ? WHERE id = ?", [birthday, occupation, biography, nationality, userId]);
    }

    $("select").change(opslaan);

  });

  $(document).ready(function () {
    $(".searchbox").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(this).parent().parent().find('.styleCountryButton').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  const empties = document.querySelectorAll('.empty');
  let currentDragged = undefined;

  for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
  }

  function dragStart() {
    currentDragged = this;
  }

  function dragOver(e) {
    e.preventDefault();
    this.classList.add('hovered');
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.classList.remove('hovered');
  }

  function dragDrop() {
    this.classList.remove('hovered');
    this.append(currentDragged);
    currentDragged = undefined;
  }

  $(document).ready(async () => {
    let userId = (await SESSION).user.id;

    let used_flags = FYSCloud.API.queryDatabase(
      "SELECT uf.userId, af.flagId, uf.visited, af.flagName FROM all_flags af LEFT JOIN used_flags uf ON uf.flagId = af.flagId AND uf.userId = ?",
      [userId]
    )


    used_flags.done(function (data) {
      for (i = 0; i < data.length; i++) {
        let currentFlag = data[i];
        let flagNameCorrector = decodeURI(currentFlag.flagName).replaceAll('+', ' ');
        let button = $('<button class="styleCountryButton fill" draggable="true" data-id="' + currentFlag.flagId + '">' + flagNameCorrector + '</button>');
        if ((currentFlag.userId) == undefined) {
          $(".notVisited").append(button)
        } else if (currentFlag.visited == true) {
          $(".visited").append(button)
        } else {
          $(".mustVisit").append(button)
        }
      }
      const fill = document.querySelectorAll('.fill');
      for (let i = 0; i < fill.length; i++) {
        fill[i].addEventListener('dragstart', dragStart);
      }
    });

    $('#saveButton').on('click', async function () {
      let userId = (await SESSION).user.id;

      let usedflags = [];
      let visitedButtons = $(".visited button");
      let mustVisitButtons = $(".mustVisit button");

      for (let i = 0; i < visitedButtons.length; i++) {
        let button = $(visitedButtons[i]);
        let id = button.attr('data-id');
        usedflags.push([userId, id, true]);
      }

      for (let i = 0; i < mustVisitButtons.length; i++) {
        let button = $(mustVisitButtons[i]);
        let id = button.attr('data-id');
        usedflags.push([userId, id, false]);
      }

      FYSCloud.API.queryDatabase(
          "DELETE FROM used_flags WHERE userID = ?",
          [userId]
        )
        .done(function () {
          FYSCloud.API.queryDatabase(
              "INSERT INTO used_flags(userId, flagId, visited) VALUES ?",
              [usedflags]
            )
            .done(function () {
              alert("Opslaan is gelukt!");
            });
        });
    });

  });
});