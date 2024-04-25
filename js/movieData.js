const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2VjNTg4MzU0M2Q3N2VhNDIxYTVhNDc5NmVmMzZhNCIsInN1YiI6IjY2MjdiNzAyNjNkOTM3MDE4Nzc1OTg1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qyM1w2gcsGguD9HfSfOL17n7PWKNpRijew5MYXSYXpw",
  },
};

const searchInput = document.querySelector("input[type='search']");
const movieListElement = document.querySelector(".movie-list");

let movies = [];

// 영화 목록 표시 함수
const displayMovies = (movies) => {
  movieListElement.innerHTML = ""; // 초기화

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    movieListElement.appendChild(card);
  });
};

// 영화 리스트 카드 생성 함수
const createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.classList.add("item", "movie-card");

  const movieImg = document.createElement("div");
  movieImg.classList.add("movie-img");
  const posterImg = document.createElement("img");
  posterImg.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  posterImg.alt = movie.title;
  movieImg.appendChild(posterImg);
  card.appendChild(movieImg);

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = movie.title;
  card.appendChild(title);

  const overview = document.createElement("p");
  overview.classList.add("overview");
  const truncatedOverview =
    movie.overview.length > 100
      ? movie.overview.substring(0, 100) + "..."
      : movie.overview;
  overview.textContent = truncatedOverview;
  card.appendChild(overview);

  const releaseDate = document.createElement("p");
  releaseDate.classList.add("release-date");
  releaseDate.textContent = " 개봉일 : " + movie.release_date;
  card.appendChild(releaseDate);

  const rating = document.createElement("p");
  rating.textContent = " 평론가 점수 : " + movie.vote_average;
  card.appendChild(rating);

  const detailBtn = document.createElement("div");
  detailBtn.classList.add("btn");
  detailBtn.innerHTML = "상세보기";
  card.appendChild(detailBtn);

  // 팝업으로 상세 내용 확인하기
  card.addEventListener("click", () => {
    openPopup(movie);
  });

  return card;
};

// 검색
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchText) ||
      movie.overview.toLowerCase().includes(searchText)
    );
  });

  displayMovies(filteredMovies);
});

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    movies = data.results;

    displayMovies(movies);
  })
  .catch((err) => console.error(err));
