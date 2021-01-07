$(function(){
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

      "UPDATE user SET birthDate = ?, occupation = ?, biography = ?, nationality = ? WHERE id = ?"
      ,[birthday, occupation, biography, nationality, userId]);
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

const flag = document.querySelector('.flag');
const emptys = document.querySelectorAll('.empty');

flag.addEventListener('dragstart', dragStart);
flag.addEventListener('dragend', dragEnd);

for (const empty of emptys) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'flag';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(flag);
}

});

