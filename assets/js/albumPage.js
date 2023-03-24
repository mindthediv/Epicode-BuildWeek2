const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let param_id = new URLSearchParams(window.location.search).get("album_id");

const mainTitle = document.getElementById("mainTitle");
const mainImg = document.getElementById("mainImg");
const mainArtist = document.getElementById("mainArtist");
const numTracks = document.getElementById("nTracks");
const totDur = document.getElementById("totDur");
const mainCard = document.getElementById("mainCard");
const mainCol = document.getElementById("mainCol");
const trackOrder = document.getElementById("trackOrder");
const artistAvatar = document.getElementById("artistAvatar");
const alsoRow = document.getElementById("alsoRow");
const h2AlsoRow = document.getElementById("h2AlsoRow");
const imgPlayer = document.getElementById("imgPlayer");
const songPlayer = document.getElementById("songPlayer");
const artistPlayer = document.getElementById("artistPlayer");
const durationPlayer = document.getElementById("durationPlayer");
let trackArray = [];
console.log(trackArray);

let tracklist = [];
const questaUl = document.getElementById("questaUl");
// POPOLA LA AERO DELL'ALBUM
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
// CREA E POPOLA LA BOX DA "APPENDARE" IN UNA ROW
let createBox = (boxImg, albumId, boxTitle, boxArtist, artistId, appendRow) => {
  let newCol = document.createElement("div");
  newCol.setAttribute("class", "col-2");
  newCol.innerHTML = `<div class="fetchBox pt-4 p-3 mx-3 d-flex flex-column text-light bg-dark rounded"> <img class="rounded mb-2" src="${boxImg}" style="max-width: 78%; margin:0 auto" alt="" /><div style:"margin:0 auto" class="d-flex flex-column px-4 mx-1 align-items-start"><button type="button" style="background-color:#1ED760;border: none;  border-radius: 50%;" class="d-none verde me-4"><i class="bi bi-play-fill"></i></button> <a href="./albumPage.html?album_id=${albumId}"  style="text-decoration: none; color: white;" class='text-truncate w-100'><h6>${boxTitle}</h6></a><span class="text-secondary text-truncate w-100"><a href="./artistPage.html?artist_id=${artistId}" style="text-decoration: none; color: grey;">${boxArtist}</a></span></div></div>`;

  appendRow.appendChild(newCol);
};

// FETCH E AVVIO CREAZIONE ELEMENTI
let getAlbum = async () => {
  let response = await fetch(SEARCH_URL + param_id);
  if (response.ok) {
    let albumData = await response.json();
    console.log(albumData);
    const getArtistTracks = () => {
      return `https://striveschool-api.herokuapp.com/api/deezer/artist/${albumData.artist.id}/top?limit=50`;
    };
    popolaAlbum(
      albumData.cover_big,
      albumData.title,
      albumData.artist.name,
      albumData.artist.id,
      albumData.tracks.data.length,
      albumData.duration,
      albumData.artist.picture_small
    );

    // TRACKLIST GENERATION
    tracklist = albumData.tracks.data;
    for (let i = 0; i < tracklist.length; i++) {
      let trackResponse = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/track/${tracklist[i].id}`
      );
      if (trackResponse.ok) {
        trackArray.push(tracklist[i]);
        let trackData = await trackResponse.json();
        let duration = formatDuration(trackData.duration);
        let rndViews = Math.floor(Math.random() * (500 * 1000000));
        while (rndViews < 1000000) {
          rndViews = Math.floor(Math.random() * (500 * 1000000));
        }
        trackOrder.innerHTML += `<div 
        }" class="trackWrap text-light d-flex align-items-center py-2" style="width: 90%; margin: 0 auto"><span class="numberPlayIcon px-4" style="color: lightgray">${
          i + 1
        }</span><div class="d-flex flex-column " style="width: 60%"><span style="width: 100%">${
          tracklist[i].title
        }</span><span style="width: 100%"><small><a style="color: lightgray; text-decoration: none;" href="./artistPage.html?artist_id=${
          albumData.artist.id
        }">${
          albumData.artist.name
        }</a></small></span> </div> <span class="d-none d-sm-block" style="width: 30%; color: lightgray;">${numberWithCommas(
          rndViews
        )}</span> <span class="d-none d-sm-block" style="width: 10%; text-align: right; color: lightgray;">${duration}</span></div>`;
      }
    }
    const trackWrap = Array.from(document.querySelectorAll(".trackWrap"));

    // FOREACH CHE PERMETTE AL NUMERO DI DIVENTARE IL PLAY

    trackWrap.forEach((el, k) => {
      el.addEventListener("mouseenter", () => {
        const numPlayHover = el.firstChild;
        let trackIndex = numPlayHover.innerHTML;
        numPlayHover.innerHTML = '<i class="bi bi-play-fill"></i>';
        el.addEventListener("mouseleave", () => {
          const numPlayHover = el.firstChild;
          numPlayHover.innerHTML = trackIndex;
        });

        let iconPlay = numPlayHover.firstChild;
        iconPlay.addEventListener("click", () => {
          imgPlayer.setAttribute("src", `${trackArray[k].album.cover_medium}`);
          songPlayer.innerHTML = `${trackArray[k].title}`;
          artistPlayer.innerHTML = `${trackArray[k].artist.name}`;
          durationPlayer.innerHTML = `${formatDuration(
            trackArray[k].duration
          )}`;
        });
      });
    });

    // BOX ROW GENERATION (ALSOROW)
    let getAlso = async () => {
      try {
        let response = await fetch(getArtistTracks());
        console.log(response);
        if (response.ok) {
          let fetchData = await response.json();
          console.log(fetchData);
          arrayResults = fetchData.data;
          h2AlsoRow.innerHTML = albumData.artist.name;
          for (let j = 0; j < 5; j++) {
            createBox(
              arrayResults[j].album.cover_big,
              arrayResults[j].album.id,
              arrayResults[j].title,
              arrayResults[j].artist.name,
              arrayResults[j].artist.id,
              alsoRow
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAlso();
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
