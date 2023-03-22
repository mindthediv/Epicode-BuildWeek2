const SEARCH_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?";
let SEARCH_PARAM = "q=playlist";
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
