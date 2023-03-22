const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?";
let SEARCH_PARAM = "q=rock";
const playlistGrid = document.getElementById("playlistGrid");
let playlistArray = [];

let createPlaylist = (dataImg, dataTitle, dataId) => {
  let newPlaylist = document.createElement("div");
  newPlaylist.setAttribute(
    "class",
    "col col-4 d-flex align-items-center bg-dark p-0 m-2"
  );
  newPlaylist.style = "width: 30%";
  newPlaylist.innerHTML = `<img src="${dataImg}" width="80" alt="" class="me-4"><a style='text-decoration: none ; color:white;' href="./albumPage.html?album_id=${dataId}" <h6>${dataTitle}</h6>`;
  playlistGrid.appendChild(newPlaylist);
};

let getMusic = async () => {
  try {
    let response = await fetch(SEARCH_URL + SEARCH_PARAM);
    console.log(response);
    if (response.ok) {
      let fetchData = await response.json();
      console.log(fetchData);
      arrayResults = fetchData.data;
      for (let i = 0; i < 6; i++) {
        createPlaylist(
          arrayResults[i].album.cover_big,
          arrayResults[i].title,
          arrayResults[i].album.id
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getMusic();

const forYouRow = document.getElementById("forYouRow");
const recentRow = document.getElementById("recentRow");
const maybeRow = document.getElementById("maybeRow");
let FORYOU_PARAM = "q=happy";

let createBox = (boxImg, albumId, boxTitle, boxArtist, artistId, appendRow) => {
  let newCol = document.createElement("div");
  newCol.setAttribute("class", "col-2");
  newCol.innerHTML = `<div class="fetchBox p-3 d-flex flex-column text-light bg-dark rounded"> <img class="rounded mb-2" src="${boxImg}" style="max-width: 160px" alt="" /> <div class="text-start"> <a href="./albumPage.html?album_id=${albumId}"  style="text-decoration: none; color: white;"><h6 class="text-truncate">${boxTitle}</h6></a><span class="text-secondary"><a href="./artistPage?artist_id=${artistId}" style="text-decoration: none; color: grey;" class='text-truncate'>${boxArtist}</a></span></div></div>`;

  appendRow.appendChild(newCol);
};

let getForYou = async () => {
  try {
    let response = await fetch(SEARCH_URL + FORYOU_PARAM);
    console.log(response);
    if (response.ok) {
      let fetchData = await response.json();
      console.log(fetchData);
      arrayResults = fetchData.data;
      for (let i = 0; i < 6; i++) {
        createBox(
          arrayResults[i].album.cover_big,
          arrayResults[i].album.id,
          arrayResults[i].title,
          arrayResults[i].artist.name,
          arrayResults[i].artist.id,
          forYouRow
        );
      }
      for (let i = 6; i < 12; i++) {
        createBox(
          arrayResults[i].album.cover_big,
          arrayResults[i].album.id,
          arrayResults[i].title,
          arrayResults[i].artist.name,
          arrayResults[i].artist.id,
          recentRow
        );
      }
      for (let i = 12; i < 18; i++) {
        createBox(
          arrayResults[i].album.cover_big,
          arrayResults[i].album.id,
          arrayResults[i].title,
          arrayResults[i].artist.name,
          arrayResults[i].artist.id,
          maybeRow
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getForYou();