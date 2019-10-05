$(document).ready(() => {
    $('#country').select2();
    let flag = "https://restcountries.eu/rest/v2/all";
    let contributor = "./assets/contributor.json";
    fetch(flag)
        .then(res => res.json())
        .then(flagData => {
            flagData.map((data) => {
                $('#country').append("<option value='" + data.flag + "'>" + data.name + "</option>")
            })
        })
    fetch(contributor)
        .then((res) => res.json())
        .then((json) => {
            json.map((data) => {
                $("#contributors").append(`<div class="column is-4">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="${data.avatar}" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>${data.name}</strong> <small><a href="https://github.com/${data.username}" target="blank">@${data.username}</a></small>
                <br>
                ${data.location} <img src=${data.flag} width="25">
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>`)
            })
        })
})
$("#cari").submit(function (e) {
    e.preventDefault()
    let username = $("input[name='username']").val();
    let country = $("select[name='country']").val();
    let github = "https://api.github.com/users/" + username;
    //  alert('https://api.github.com/users/'+username);
    fetch(github)
        .then(function (response) {
            return response.json();
        })
        .then(function (text) {
            let user = {
                name: text.name,
                username: text.login,
                avatar: text.avatar_url,
                flag: country,
                location: text.location
            }
            $('#result').html("<pre>" + JSON.stringify(user, null, '\t') + "</pre>");
        });

    return false;
})