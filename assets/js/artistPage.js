const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
// FINCHE NON LINKIAMO LE PAGINE IN UN UNICO BRANCH LAVORIAMO CON UN PARAMETRO STATICO
let param_id = 412; // <- DIVENTERA' - - -> new URLSearchParams(window.location.search).get("artist_id");
let trackID = "/top?limit=50";
let miPiaceMessi = document.getElementById("miPiaceMessi");

const questoDiv = document.getElementById("questoDiv");
let tracklist = [];
const questaUl = document.getElementById("questaUl");
let popolaAlbum = (albumImg, albumTitle, nb_fan, tracklist) => {
  questoDiv.innerHTML = `
<div class='row'>
    <div class="col col-12 pt-4 fotoArtista" style="background-image: url(${albumImg});">                
      <div class="contenitore m-3">
        <div id="artistaVer">
          <p><i class="bi bi-patch-check-fill"></i>
          Artista verificato</p>
          <h1>${albumTitle}</h1>
          <p>${nb_fan} ascoltatori mensili</p>
        </div>
      </div>
    </div>
  
</div>
`;
};
// `<img width='200' src="${albumImg}"><h2>${albumTitle}</h2>`
// FETCH E AVVIO CREAZIONE ELEMENTI

// estrapolare le tracks
let getTracks = async () => {
  let response = await fetch(SEARCH_URL + param_id + trackID);
  if (response.ok) {
    let trackData = await response.json();
    console.log(trackData);
    let tracklist = trackData.data;
    tracklist.forEach((track) => {
      let liTrack = document.createElement("li");
      liTrack.innerHTML = `
      <div class="row ms-2">
      <div class="col mt-3 d-flex flex-wrap align-items-center">
        <div>
        <img class="img-fluid" src="${track.album.cover_small}" alt="">
        </div>
        <div class="d-md-flex flex-md-around">
        <p>${track.title_short}</p>
        <p class="mt-sm-2">${track.rank}</p>
        <p class="d-sm-none d-md-block">${Math.floor(track.duration / 60)}:${(
        track.duration % 60
      )
        .toString()
        .padStart(2, "0")}</p>
        </div>
    </div>
  </div>
      `;
      questaUl.appendChild(liTrack);

      miPiaceMessi.innerHTML = `<div class="d-flex">
    <img class="rounded-circle me-2" src="${track.album.cover_small}" width="70" alt="#" />
    <div class="d-flex flex-column justify-content-center">
      <p class="mb-2">Hai messo mi piace a 3 brani</p>
      <a href="" class="text-decoration-none">
        <p id="artistaPiaciuto" class="sottoGrigio">
          Di ${track.artist.name}
        </p>
      </a>
    </div>
    </div>`;
    });
  }
};

let getAlbum = async () => {
  let response = await fetch(SEARCH_URL + param_id);
  if (response.ok) {
    let artistData = await response.json();
    console.log(artistData);
    getTracks();
    popolaAlbum(artistData.picture_xl, artistData.name, artistData.nb_fan);
  }
};
getAlbum();
