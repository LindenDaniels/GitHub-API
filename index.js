'use strict';

function getGitHubRepos(username) {
  
  const url = `https://api.github.com/users/${username}/repos`;

  console.log(`Finding repos for ${username}`);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}
function displayResults(responseJson) {
  
  console.log(responseJson);
  $("#repo-list").empty();
  responseJson.forEach(obj =>
    $("#repo-list").append(
      `<li><a href='${obj.url}'>${obj.name}</a></li>`
    )
  );
  $("#results").removeClass("hidden");
}
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const username = $("#js-github-handle").val();
    getGitHubRepos(username);
  });
}
$(watchForm);