const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
// FINCHE NON LINKIAMO LE PAGINE IN UN UNICO BRANCH LAVORIAMO CON UN PARAMETRO STATICO
let param_id = new URLSearchParams(window.location.search).get("artist_id");
let trackID = "/top?limit=50";
let miPiaceMessi = document.getElementById("miPiaceMessi");
let trackArray = [];

const questoDiv = document.getElementById("questoDiv");
let tracklist = [];
const questaUl = document.getElementById("questaUl");
let popolaAlbum = (albumImg, albumTitle, nb_fan, tracklist) => {
  questoDiv.innerHTML = `

    <div class="col col-12 pt-4 fotoArtista" style="background-image: url(${albumImg});">                
      <div class="contenitore my-3">
        <div id="artistaVer">
          <p><i class="bi bi-patch-check-fill"></i>
          Artista verificato</p>
          <h1>${albumTitle}</h1>
          <p>${nb_fan} ascoltatori mensili</p>
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

    tracklist.forEach((track, k) => {
      trackArray.push(tracklist[k]);
      let liTrack = document.createElement("li");
      liTrack.innerHTML = `
      <div class="trackWrap row d-flex align-items-center justify-content-start w-100">
        <div style="width: 4.7rem;" class="mb-3 ms-3">
        <img class="img-fluid" src="${track.album.cover_small}" alt="">
        </div>
        <div class="col-2 col-sm-4 justify-content-start">
        <p>${track.title_short}</p>
        <p class="d-sm-flex d-md-none mb-sm-4">${track.rank}</p>
        </div>
        <div class="d-sm-none d-md-flex col-sm-3">
        <p class="mt-sm-2">${track.rank}</p>
        </div>
        <div class="col-3 d-flex align-items-end">
        <p class="d-sm-none d-md-flex text-end">${Math.floor(
          track.duration / 60
          //forza napoli
        )}:${(track.duration % 60).toString().padStart(2, "0")}</p>
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
    const trackWrap = Array.from(document.querySelectorAll(".trackWrap"));

    trackWrap.forEach((el, k) => {
      // el.addEventListener("mouseenter", () => {
      //   const numPlayHover = el.firstChild;
      //   let trackIndex = numPlayHover.innerHTML;

      //   el.addEventListener("mouseleave", () => {
      //     const numPlayHover = el.firstChild;
      //     numPlayHover.innerHTML = trackIndex;
      //   });
      // });

      el.addEventListener("click", () => {
        imgPlayer.setAttribute("src", `${trackArray[k].album.cover_medium}`);
        songPlayer.innerHTML = `${trackArray[k].title}`;
        artistPlayer.innerHTML = `${trackArray[k].artist.name}`;
        durationPlayer.innerHTML = `${formatDuration(trackArray[k].duration)}`;
      });
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
