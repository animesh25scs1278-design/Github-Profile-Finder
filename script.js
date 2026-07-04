let apiurl = "https://api.github.com/users/";
console.log("Script Connected");
const inp = document.getElementById("username");
const btn = document.getElementById("button");
console.log(btn);
const getProfile = async () => {
  try {
    console.log("Button Clicked");
    const usernameinput = inp.value.trim();
    if (usernameinput === "") {
      return;
    } else {
      console.log("Searching for:", usernameinput);
    }
    btn.innerText = "Searching...";
    btn.disabled = true;
    apiurl = `https://api.github.com/users/${usernameinput}`;
    console.log(apiurl);
    let response = await fetch(apiurl);
    console.log(response);
    let data = await response.json();
    console.log(data);
    if (response.ok == true) {
      const ProfileCardElement = document.getElementById("Profile-Card");
      ProfileCardElement.style.display = "flex";
      const avatarElement = document.getElementById("avatar");
      avatarElement.src = data.avatar_url;
      const nameElement = document.getElementById("name");
      if (data.name == null) {
        nameElement.innerText = "Name not available";
      } else {
        nameElement.innerText = data.name;
      }
      const UsernameElement = document.getElementById("user-name");
      UsernameElement.innerText = `Username: ${data.login}`;
      const bioElement = document.getElementById("bio");
      if (data.bio == null) {
        bioElement.innerText = " No Bio available";
      } else {
        bioElement.innerText = `Bio: ${data.bio}`;
      }
      const followersElement = document.getElementById("followers");

      if (data.followers == 0) {
        followersElement.innerText = " No followers";
      } else {
        followersElement.innerText = data.followers;
      }
      const followingElement = document.getElementById("following");

      if (data.following == 0) {
        followingElement.innerText = " No following";
      } else {
        followingElement.innerText = data.following;
      }
      const reposElement = document.getElementById("repos");

      if (data.public_repos == 0) {
        reposElement.innerText = " No Public Repositories";
      } else {
        reposElement.innerText = data.public_repos;
      }
      const locationElement = document.getElementById("location");
      if (data.location == null) {
        locationElement.innerText = "Location not available";
      } else {
        locationElement.innerText = `Location: ${data.location}`;
      }
      const linkElement = document.getElementById("profile_link");
      linkElement.href = data.html_url;
      linkElement.innerHTML = "View GitHub Profile";
    } else {
      alert("no such user");
    }
  } catch (error) {
    console.log(error);
  } finally {
    btn.innerText = "Search";
    btn.disabled = false;
  }
};
btn.addEventListener("click", getProfile);
inp.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    getProfile();
  }
});
