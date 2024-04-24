const openPopup = (movie) => {
  const popupOverlay = document.querySelector(".popup-overlay");
  const popupTitle = document.querySelector(".popup-title");
  const popupOverview = document.querySelector(".popup-overview");
  const popupImg = document.querySelector(".popup-img");
  const popupId = document.querySelector(".popup-id");

  popupTitle.textContent = "영화 제목 : " + movie.title;
  popupImg.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  popupId.textContent = "ID: " + movie.id;
  popupOverview.textContent = "영화 줄거리 : " + movie.overview;

  popupOverlay.style.display = "flex";
};

const closePopup = () => {
  const popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.style.display = "none";
};
