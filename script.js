 //Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener(   //ye wala swarchbar per koi name dalkar enter kroge to bhi ho jayega iwsliye listner lagauye hai
  "keydown",
  function (e)    // yha jo e pass kiye ho wo jispar lagaye ho uske value or property bta rha hai
  {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

input.addEventListener("input", function () {  // searchbar me klch bhi nhi dale ho fir bhi enter mr rhe ho to display none krna padega
 // noresults.style.display = "none";
});



// Functions
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}

function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
   function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5; //agar location wala null hai to usko fade kr diye
        param2.previousElementSibling.style.opacity = 0.5;  // example ke liye location ka jo tah hai usko is line se fade kr rhe hai
        return false;
      } else {
        return true;
      }
   }
    avatar.src = `${data.avatar_url}`;  ///insv me $ use krna hai to backtigs ke andar hi use hoga bahar use kroge to error dega
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = data.followers;   // ya fir bactighs aur $ dono me sde koi mt use kro
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";  // upper me line69 me none kiye hai isliye nhi dikh rha tha but ab dikhega
  }
}

btnmode.addEventListener("click", function () {
  if (darkMode == false)
  {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});
//dark mode default
//const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if (localStorage.getItem("dark-mode")) {
  //darkMode = localStorage.getItem("dark-mode");
  darkModeProperties();// is line sedark mode aa jega
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  //darkMode = prefersDarkMode;
  lightModeProperties(); // lightmodewcall hoga to white background aa jayega
}

function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./moon-icon.svg";  // is line se jo image dalogr wo set ho jayega
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}


getUserData(url + "amanraj4");
