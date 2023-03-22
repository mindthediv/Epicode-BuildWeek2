const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
// FINCHE NON LINKIAMO LE PAGINE IN UN UNICO BRANCH LAVORIAMO CON UN PARAMETRO STATICO
let param_id = 412; // <- DIVENTERA' - - -> new URLSearchParams(window.location.search).get("artist_id");

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
    let artistData = await response.json();
    console.log(artistData);
    popolaAlbum(artistData.picture_big, artistData.name);
  }
};
getAlbum();
