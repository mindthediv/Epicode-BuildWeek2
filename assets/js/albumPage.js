const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
// FINCHE NON LINKIAMO LE PAGINE IN UN UNICO BRANCH LAVORIAMO CON UN PARAMETRO STATICO
let param_id = 75621062; // <- DIVENTERA' - - -> new URLSearchParams(window.location.search).get("album_id");

const questoDiv = document.getElementById("questoDiv");
let tracklist = [];
const questaUl = document.getElementById("questaUl");
let popolaAlbum = (albumImg, albumTitle) => {
  questoDiv.innerHTML = `<img width='200' src="${albumImg}"><h2>${albumTitle}</h2>`;
};

// FETCH E AVVIO CREAZIONE ELEMENTI
let getAlbum = async () => {
  let response = await fetch(SEARCH_URL + param_id);
  if (response.ok) {
    let albumData = await response.json();
    tracklist = albumData.tracks.data;
    console.log(tracklist[1]);
    for (let i = 0; i < tracklist.length; i++) {
      questaUl.innerHTML += `<li>${tracklist[i].title}</li>`;
    }
    popolaAlbum(albumData.cover_big, albumData.title);
  }
};
getAlbum();
