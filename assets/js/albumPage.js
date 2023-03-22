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
      let trackResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${tracklist[i].id}`);
      if (trackResponse.ok) {
        let trackData = await trackResponse.json();
       
        let duration = formatDuration(trackData.duration);
        questaUl.innerHTML += `<li>${tracklist[i].title} - Visualizzazioni: ${trackData.nb_views} - Durata: ${duration}</li>`;
      }
    }
    popolaAlbum(albumData.cover_big, albumData.title);
  }
};

// Funzione per formattare la durata in formato "mm:ss"
function formatDuration(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

getAlbum();
