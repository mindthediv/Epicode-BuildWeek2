const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
// FINCHE NON LINKIAMO LE PAGINE IN UN UNICO BRANCH LAVORIAMO CON UN PARAMETRO STATICO
let param_id = 412; // <- DIVENTERA' - - -> new URLSearchParams(window.location.search).get("artist_id");
let trackID = "/top?limit=50";

const questoDiv = document.getElementById("questoDiv");
let tracklist = [];
const questaUl = document.getElementById("questaUl");
let popolaAlbum = (albumImg, albumTitle, nb_fan, tracklist) => {
  questoDiv.innerHTML = `
<div class='row'>
    <div class="col col-12 pt-4 fotoArtista" style="background-image: url(${albumImg});">                
      <div class="contenitore">
        <div id="artistaVer">
          <p><i class="bi bi-patch-check-fill"></i>
          Artista verificato</p>
          <h1>${albumTitle}</h1>
          <p>${nb_fan} ascoltatori mensili</p> api/deezer/artist/412/top?
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
    console.log(trackData)
    let tracklist = trackData.data;
    tracklist.forEach((track) => {
      let liTrack = document.createElement('li');
      liTrack.innerHTML = `${track.title_short} - ${track.rank} - ${track.duration}`;
      questaUl.appendChild(liTrack)
    }); 
  }
}

let getAlbum = async () => {
  let response = await fetch(SEARCH_URL + param_id);
  if (response.ok) {
    let artistData = await response.json();
    console.log(artistData);
    getTracks()
    popolaAlbum(artistData.picture_xl, artistData.name, artistData.nb_fan);    
  }
};
getAlbum();



