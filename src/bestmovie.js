import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, BASEURL } = DEFAPIKEY;

// API 데이터 불러오기
const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASEURL}3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
    const data = await response.json();
    console.log("Popular movies:", data);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// 단일 영화 객체를 받아 HTML 카드로 변환하는 함수
const createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.className = "movie-card";

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  card.innerHTML = `
    <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
  
  `;

  card.addEventListener("click", () => {
    window.location.href = `./movie_collection/html/movie_detail.html?id=${movie.id}`;
  });

  return card;
};

// 영화 데이터를 가져와서 화면에 표시하는 비동기 함수
const displayMovies = async (containerId) => {
  const movies = await getPopularMovies();
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID '${containerId}' not found.`);
    return;
  }

  container.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  });
};

// 초기 페이지 로드 시 영화를 표시
document.addEventListener('DOMContentLoaded', () => {
  displayMovies("movies_container");
});

// 네비게이션 이벤트 리스너
document.getElementById('views-link_Hot').addEventListener('click', (e) => {
  e.preventDefault();

  document.querySelector('.container').style.display = 'none';
  document.querySelector('.movie-carousel').style.display = 'none';
  document.querySelector('.movies_container').style.display = 'none';
  document.querySelector('.movies-navigation-container').style.display = 'flex'; // 일관된 요소 이름 사용
  
  displayMovies('movies-navigation-container'); // 명확한 컨테이너 ID 전달
  
  history.pushState(null, '', '#Hot');
});

// 뒤로가기 이벤트 처리
window.addEventListener('popstate', () => {
  const hash = location.hash;
  const show = hash === '#Hot';

  console.log('Popstate event:', hash);
  
  document.querySelector('.container').style.display = show ? 'none' : 'block';
  document.querySelector('.movie-carousel').style.display = show ? 'none' : 'block';
  document.querySelector('.movies_container').style.display = show ? 'none' : 'block';
  document.querySelector('.movies-navigation-container').style.display = show ? 'flex' : 'none';
});
