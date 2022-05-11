//Variables
const input = document.querySelector(".search input");
const button = document.querySelector(".search button");
const name = document.querySelector(".user-infos-names h3");
const username = document.querySelector(".user-infos-names a");
const dp = document.querySelector(".user-infos-img img");
const joiningDate = document.querySelector(".user-infos-names p span");
const bio = document.querySelector(".user-details");
const repos = document.querySelector(".repo-num");
const followers = document.querySelector(".followers-num");
const following = document.querySelector(".following-num");
const locationName = document.querySelector(".link1 p");
const link = document.querySelector(".link2 a");
const twitter = document.querySelector(".link3 p");
const company = document.querySelector(".link4 p");
//FUNCTIONS

function dateConverter(string) {
  let index;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "T") {
      index = i;
      break;
    }
  }
  return string.slice(0, index);
}

async function searchInfo(search) {
  const response = await fetch(`https://api.github.com/users/${search}`, {
    method: "GET",
    headers: {
      Accept: `application/vnd.github.v3+json`,
    },
  });
  const data = await response.json();
  name.textContent = data.name;
  username.textContent = data.login;
  username.href = data.html_url;
  dp.src = data.avatar_url;
  joiningDate.textContent = dateConverter(data.created_at);
  if (data.bio !== null) {
    bio.textContent = data.bio;
  }
  followers.textContent = data.followers;
  following.textContent = data.following;
  repos.textContent = data.public_repos;
  if (data.location) {
    locationName.textContent = data.location;
  } else {
    locationName.classList.add("not-available");
  }
  if (data.blog) {
    link.textContent = data.blog;
    link.href = data.blog;
  } else {
    link.href = "#";
    link.classList.add("not-available");
  }
  if (data.twitter_username) {
    twitter.textContent = data.twitter_username;
  } else {
    twitter.classList.add("not-available");
  }
  if (data.company) {
    company.textContent = data.company;
  } else {
    company.classList.add("not-available");
  }
}

//EVENT-LISTENERS
button.addEventListener("click", (e) => {
  e.preventDefault();
  const value = e.currentTarget.previousElementSibling.value;
  searchInfo(value);
});

input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    const value = e.currentTarget.value;
    searchInfo(value);
  }
});
