//Variables
const input = document.querySelector(".search input");
const button = document.querySelector(".search button");
const name = document.querySelector(".user-infos-names h3");
const username = document.querySelector(".user-infos-names a");
const dp = document.querySelector(".user-infos-img img");
const bio = document.querySelector(".user-details");
const repos = document.querySelector(".repo-num");
const followers = document.querySelector(".followers-num");
const following = document.querySelector(".following-num");
const locationName = document.querySelector(".link1 p");
const link = document.querySelector(".link2 a");
const twitter = document.querySelector(".link3 p");
const company = document.querySelector(".link4 p");
const link1 = document.querySelector(".link1");
const link2 = document.querySelector(".link2");
const link3 = document.querySelector(".link3");
const link4 = document.querySelector(".link4");
const theme = document.querySelector("header div");
const themeName = theme.querySelector("h2");
const themeImg = theme.querySelector("img");
const dateDay = document.querySelector(".day");
const dateMonth = document.querySelector(".month");
const dateYear = document.querySelector(".year");
let darkMode = localStorage.getItem("darkMode");
//FUNCTIONS

function checkANDremove(a, b) {
  if (
    a.classList.contains("not-available") &&
    b.classList.contains("not-available")
  ) {
    a.classList.remove("not-available");
    b.classList.remove("not-available");
  }
}

function add(a, b) {
  a.classList.add("not-available");
  b.classList.add("not-available");
}

function dateConverter(string) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(string);
  const arr = [date.getDate(), monthNames[date.getMonth()], date.getFullYear()];
  return arr;
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
  const joiningDate = dateConverter(data.created_at);
  dateDay.textContent = joiningDate[0];
  dateMonth.textContent = joiningDate[1];
  dateYear.textContent = joiningDate[2];
  if (data.bio) {
    bio.textContent = data.bio;
  } else {
    bio.textContent = "No Bio Mentioned";
  }
  followers.textContent = data.followers;
  following.textContent = data.following;
  repos.textContent = data.public_repos;
  if (data.location) {
    locationName.textContent = data.location;
    checkANDremove(locationName, link1);
  } else {
    add(locationName, link1);
    locationName.textContent = "NOT AVAILABLE";
  }
  if (data.blog) {
    link.textContent = data.blog;
    link.href = data.blog;
    checkANDremove(link, link2);
  } else {
    link.href = "#";
    add(link, link2);
    link.textContent = "NOT AVAILABLE";
  }
  if (data.twitter_username) {
    twitter.textContent = data.twitter_username;
    checkANDremove(twitter, link3);
  } else {
    add(twitter, link3);
    twitter.textContent = "NOT AVAILABLE";
  }
  if (data.company) {
    company.textContent = data.company;
    checkANDremove(company, link4);
  } else {
    add(company, link4);
    company.textContent = "NOT AVAILABLE";
  }
}
searchInfo("KjROX");

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

if (darkMode === "enabled") {
  document.body.classList.add("dark-theme");
  themeName.textContent = "LIGHT";
  themeImg.src = "./icons8-sun.svg";
}

theme.addEventListener("click", (e) => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeName.textContent = "LIGHT";
    themeImg.src = "./icons8-sun.svg";
    localStorage.setItem("darkMode", "enabled");
  } else {
    themeName.textContent = "DARK";
    themeImg.src = "./moon.svg";
    localStorage.setItem("darkMode", "disabled");
  }
});
