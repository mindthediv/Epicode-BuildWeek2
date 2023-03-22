const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let param_id = new URLSearchParams(window.location.search).get("album_id");

const questoDiv = document.getElementById("questoDiv");
let tracklist = [];
const questaUl = document.getElementById("questaUl");

let popolaAlbum = (albumImg, albumTitle) => {
  questoDiv.innerHTML = `<img width='200' src="${albumImg}"><h2>${albumTitle}</h2>`;
};

let getAlbum = async () => {
  let response = await fetch(SEARCH_URL + param_id);
  console.log(response);
  if (response.ok) {
    let albumData = await response.json();
    tracklist = albumData.tracks.data;
    console.log(tracklist[1]);
    for (let i = 0; i < tracklist.length; i++) {
      questaUl.innerHTML += `<li>${tracklist[i].title}</li>`;
    }
    console.log(tracklist);
    popolaAlbum(albumData.cover_big, albumData.title);
    console.log(albumData);
  }
};
getAlbum();
