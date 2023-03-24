const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?";
let SEARCH_PARAM = "q=rock";
const playlistGrid = document.getElementById("playlistGrid");
let playlistArray = [];

let createPlaylist = (dataImg, dataTitle, dataId) => {
  let newPlaylist = document.createElement("div");
  newPlaylist.setAttribute(
    "class",
    "col col-4 d-flex align-items-center bg-dark p-3 m-2 fs-5 justify-content-between"
  );
  newPlaylist.style = "width: 30%";
  newPlaylist.innerHTML = `<div class="d-flex "><img src="${dataImg}" width=80" alt="" class=" position-relative me-4"><a style='text-decoration: none ; color:white;' href="./albumPage.html?album_id=${dataId}" <h6 class>${dataTitle}</h6></div><button type="button" style=";background-color:#1ED760;border: none; border-radius: 50%;" class="d-none verde me-4"><i class="bi bi-play-fill"></i></button>`;
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
  newCol.setAttribute("class", "col-12 col-md-4 col-lg-2");
  newCol.innerHTML = `<div class="fetchBox pt-4 p-3 d-flex flex-column text-light bg-dark rounded"> <img class="rounded mb-2" src="${boxImg}" style="max-width: 78%; margin:0 auto" alt="" /><div style:"margin:0 auto" class="d-flex flex-column px-4 mx-1 align-items-start"><button type="button" style="background-color:#1ED760;border: none; border-radius: 50%;" class="d-none verde me-4"><i class="bi bi-play-fill"></i></button> <a href="./albumPage.html?album_id=${albumId}"  style="text-decoration: none; color: white; text-truncate"><h6>${boxTitle}</h6></a><span class="text-secondary text-truncate w-100"><a href="./artistPage.html?artist_id=${artistId}" style="text-decoration: none; color: grey;" class="w-100">${boxArtist}</a></span></div></div>`;

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

// const verdeList = document.getElementsByClassName("verde");
// const boxList = document.getElementsByClassName("fetchbox");

// for (let i = 0; i < verdeList.length; i++) {
//   verdeList[i].addEventListener("mouseenter", () => {
//     verdeList[i].classList.remove("d-none");
//     console.log(verdeList);
//   });
//   verdeList[i].addEventListener("mouseleave", () => {
//     verdeList[i].classList.add("d-none");
//   });
// }
