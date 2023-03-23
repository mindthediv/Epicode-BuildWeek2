const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
// FINCHE NON LINKIAMO LE PAGINE IN UN UNICO BRANCH LAVORIAMO CON UN PARAMETRO STATICO
let param_id = 75621062; // <- DIVENTERA' - - -> new URLSearchParams(window.location.search).get("album_id");

const mainTitle = document.getElementById("mainTitle");
const mainImg = document.getElementById("mainImg");
const mainArtist = document.getElementById("mainArtist");
const numTracks = document.getElementById("nTracks");
const totDur = document.getElementById("totDur");
const mainCard = document.getElementById("mainCard");
const mainCol = document.getElementById("mainCol");
const trackOrder = document.getElementById("trackOrder");
const artistAvatar = document.getElementById("artistAvatar");

let tracklist = [];
const questaUl = document.getElementById("questaUl");

let popolaAlbum = (
  albumImg,
  albumTitle,
  artistName,
  artistId,
  nTracks,
  totDurPar,
  artistPic
) => {
  mainImg.setAttribute("src", `${albumImg}`);
  mainTitle.innerHTML = `${albumTitle} `;
  mainArtist.innerHTML = ` ${artistName} `;
  mainArtist.style = "color: white; text-decoration: none;";
  mainArtist.setAttribute("href", `./artistPage.html?artist_id=${artistId}`);
  numTracks.innerHTML = `<span> ${nTracks} Brani </span>`;
  totDur.innerHTML = ` ${formatDuration(totDurPar)}`;
  mainCard.style = `background-image: url("${albumImg}"); background-size: cover; background-position:top;`;
  mainCol.style = "backdrop-filter: blur(62px)";
  artistAvatar.setAttribute("src", `${artistPic}`);
  artistAvatar.style = "margin-right: 1em";
};

// FETCH E AVVIO CREAZIONE ELEMENTI
let getAlbum = async () => {
  let response = await fetch(SEARCH_URL + param_id);
  if (response.ok) {
    let albumData = await response.json();
    console.log(albumData);
    popolaAlbum(
      albumData.cover_big,
      albumData.title,
      albumData.artist.name,
      albumData.artist.id,
      albumData.tracks.data.length,
      albumData.duration,
      albumData.artist.picture_small
    );

    tracklist = albumData.tracks.data;
    for (let i = 0; i < tracklist.length; i++) {
      let trackResponse = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/track/${tracklist[i].id}`
      );
      if (trackResponse.ok) {
        let trackData = await trackResponse.json();
        let duration = formatDuration(trackData.duration);
        let rndViews = Math.floor(Math.random() * (500 * 1000000));
        while (rndViews < 1000000) {
          rndViews = Math.floor(Math.random() * (500 * 1000000));
        }
        trackOrder.innerHTML += `<div id="tracklistWrap-${
          i + 1
        }" class="trackWrap text-light d-flex align-items-center py-2" style="width: 90%; margin: 0 auto"><span class="px-4" style="color: lightgray">${
          i + 1
        }</span><div class="d-flex flex-column " style="width: 60%"><span style="width: 100%">${
          tracklist[i].title
        }</span><span style="width: 100%"><small><a style="color: lightgray; text-decoration: none;" href="./artistPage.html?artist_id=${
          albumData.artist.id
        }">${
          albumData.artist.name
        }</a></small></span> </div> <span style="width: 30%; color: lightgray;">${numberWithCommas(
          rndViews
        )}</span> <span style="width: 10%; text-align: right; color: lightgray;">${duration}</span></div>`;
      }
    }
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
// Funzione per formattare le visualizzazioni
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
console.log();
///////

getAlbum();
