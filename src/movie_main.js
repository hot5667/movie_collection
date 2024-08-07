// API키와 옵션 임포트
import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, OPTIONS, BASEURL } = DEFAPIKEY;

// 전역 변수
let $movies = [];
let $current_index = 0;

// DOM 요소 가져오기
const DOM_ELEMENTS = {
  movieCarouselTrack: document.getElementById("movie-carousel-track"),
  mainCarouselContainer: document.getElementById("carousel-container"),
  movieCarousel: document.getElementById("movie-carousel"),
  topRatedMovieCarousel: document.getElementById("top-rated-movie-carousel"),
  choiceMovieCarousel: document.getElementById("choice-movie-carousel"),
  searchInput: document.getElementById("search-input"),
  searchButton: document.getElementById("search-button"),
  prevMovieBtn: document.getElementById("prevMovieBtn"),
  nextMovieBtn: document.getElementById("nextMovieBtn"),
  logo: document.getElementById("logo"),
  movieSearchContainer: document.querySelector(".movie-search-container"),
  moviesNavigationContainer: document.getElementById("movies-navigation-container")
};

// 영화 데이터를 가져오는 비동기 함수
const fetchMovies = async () => {
  const URL = `${BASEURL}3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
  try {
    const RESPONSE = await fetch(URL, OPTIONS);
    if (!RESPONSE.ok) throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    const DATA = await RESPONSE.json();
    $movies = DATA.results;
    displayMovies(); // 화면에 영화 표시
  } catch (ERROR) {
    console.error("Error fetching movies:", ERROR);
  }
};

// 단일 영화 객체를 받아 HTML 카드로 변환하는 함수
const createMovieCard = (MOVIE) => {
  const CARD = document.createElement("div");
  CARD.classList.add("movie-card");

  const POSTER = document.createElement("img");
  POSTER.src = `https://image.tmdb.org/t/p/w500/${MOVIE.poster_path}`;
  POSTER.alt = MOVIE.title;
  POSTER.classList.add("movie-poster");
  CARD.appendChild(POSTER);

  CARD.addEventListener("click", () => {
    window.location.href = `/html/movie_detail.html?id=${MOVIE.id}`;
  });

  return CARD;
};

// 영화 데이터를 화면에 출력하는 함수
const displayMovies = () => {
  const { movieCarouselTrack } = DOM_ELEMENTS;
  movieCarouselTrack.innerHTML = "";

  $movies.forEach((MOVIE, index) => {
    // 상위 10개의 영화에 순위를 부여
    const RANK = index < 10 ? index + 1 : null;
    const CARD = createMovieCard(MOVIE, RANK);
    movieCarouselTrack.appendChild(CARD);
  });

  // 캐러셀에 무한 스크롤을 위한 카드 복제
  Array.from(movieCarouselTrack.children).slice(0, 4).forEach((CHILD) => {
    movieCarouselTrack.appendChild(CHILD.cloneNode(true));
  });

  updateCarousel(); // 캐러셀 업데이트 호출
};

// 캐러셀 업데이트 함수
const updateCarousel = () => {
  const { movieCarouselTrack } = DOM_ELEMENTS;
  const TRACK_WIDTH = movieCarouselTrack.offsetWidth;
  const CARD_WIDTH = TRACK_WIDTH / 4;

  movieCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
  movieCarouselTrack.style.transform = `translateX(${- $current_index * CARD_WIDTH}px)`;

  if ($current_index >= $movies.length || $current_index < 0) {
    setTimeout(() => {
      movieCarouselTrack.style.transition = 'none';
      $current_index = ($current_index >= $movies.length) ? 0 : $movies.length - 1;
      movieCarouselTrack.style.transform = `translateX(${- $current_index * CARD_WIDTH}px)`;
    }, 500);
  }
};

// 버튼 클릭 시 캐러셀 스크롤 조정
const scrollCarousel = (direction) => {
  const { movieCarouselTrack } = DOM_ELEMENTS;
  const TRACK_WIDTH = movieCarouselTrack.offsetWidth;
  const CARD_WIDTH = TRACK_WIDTH / 4;
  const MAX_INDEX = $movies.length - 1;

  if (direction === 'right') {
    $current_index = ($current_index >= MAX_INDEX) ? 0 : $current_index + 1;
  } else if (direction === 'left') {
    $current_index = ($current_index <= 0) ? MAX_INDEX : $current_index - 1;
  }

  updateCarousel();
};

// 버튼 클릭 이벤트 리스너 추가
const setupButtonEvents = () => {
  const { prevMovieBtn, nextMovieBtn } = DOM_ELEMENTS;

  prevMovieBtn.addEventListener("click", () => scrollCarousel('left'));
  nextMovieBtn.addEventListener("click", () => scrollCarousel('right'));
};

// 검색 결과를 검색 컨테이너에 렌더링하는 함수
const renderMovies = () => {
  const { movieSearchContainer } = DOM_ELEMENTS;
  movieSearchContainer.innerHTML = "";

  $movies.forEach((MOVIE, index) => {
    // 상위 10개의 영화에 순위를 부여
    const RANK = index < 10 ? index + 1 : null;
    const CARD = createMovieCard(MOVIE, RANK);
    movieSearchContainer.appendChild(CARD);
  });
};

// 검색 기능을 업데이트하여 검색된 영화만 표시
const searchMovies = async () => {
  const { searchInput, movieSearchContainer, mainCarouselContainer, movieCarousel, topRatedMovieCarousel, choiceMovieCarousel } = DOM_ELEMENTS;
  const QUERY = searchInput.value.trim().toLowerCase();

  if (!QUERY) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "검색어를 입력하세요.",
      showConfirmButton: false,
      timer: 1500,
    });
    showAllCards(); // 모든 카드 보이기
    toggleMainCarousels(true); // 메인 캐러셀 보이기
    return;
  }

  try {
    const URL = `${BASEURL}3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(QUERY)}&language=ko-KR&page=1`;
    const RESPONSE = await fetch(URL, OPTIONS);
    if (!RESPONSE.ok) throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    const DATA = await RESPONSE.json();

    if (DATA.results.length === 0) {
      Swal.fire("검색 결과가 없습니다!", "정확히 입력해주세요.", "warning");
      showAllCards(); // 모든 카드 보이기
      toggleMainCarousels(true); // 메인 캐러셀 보이기
      return;
    }

    $movies = DATA.results;
    renderMovies(); // 검색 결과를 렌더링
    toggleMainCarousels(false); // 메인 캐러셀 숨기기
  } catch (ERROR) {
    console.error("Error fetching search results:", ERROR);
  }
};

// 모든 카드를 표시하는 함수
const showAllCards = () => {
  document.querySelectorAll(".card").forEach((CARD) => CARD.style.display = "block");
};

// 메인 캐러셀을 토글하는 함수
const toggleMainCarousels = (SHOW) => {
  const { mainCarouselContainer, movieCarousel, topRatedMovieCarousel, choiceMovieCarousel, moviesNavigationContainer, movieSearchContainer } = DOM_ELEMENTS;

  const displayClass = SHOW ? 'flex' : 'none'; 

  mainCarouselContainer.style.display = displayClass;
  movieCarousel.style.display = displayClass;
  topRatedMovieCarousel.style.display = displayClass;
  choiceMovieCarousel.style.display = displayClass;
  moviesNavigationContainer.style.display = displayClass;
  movieSearchContainer.style.display = SHOW ? 'none' : 'flex';
};

// 로고 클릭 시 페이지 리로드
const setupLogoClick = () => {
  DOM_ELEMENTS.logo.addEventListener("click", () => location.reload());
};

// 검색 버튼 클릭 시 이벤트 리스너 추가
const setupSearchButton = () => {
  DOM_ELEMENTS.searchButton.addEventListener("click", searchMovies);
};

// 엔터 키 입력 시 검색 기능 호출
const setupSearchInput = () => {
  DOM_ELEMENTS.searchInput.addEventListener("keypress", async (EVENT) => {
    if (EVENT.key === "Enter") {
      EVENT.preventDefault();
      await searchMovies();
    }
  });
};

// 영화 카테고리 링크 클릭 시 처리
const setupCategoryLinks = () => {
  ["views-link_Hot", "views-link_Views", "views-link_Choice"].forEach((ID) => {
    document.getElementById(ID).addEventListener("click", () => {
      DOM_ELEMENTS.movieSearchContainer.innerHTML = "";
      toggleMainCarousels(true); // 메인 캐러셀 보이기
    });
  });
};

// 페이지 로딩 시 초기 설정
const initializePage = () => {
  // 초기 상태에서 검색 컨테이너 숨기기
  DOM_ELEMENTS.movieSearchContainer.style.display = 'none';

  fetchMovies();
  setupButtonEvents();
  setupLogoClick();
  setupSearchButton();
  setupSearchInput();
  setupCategoryLinks();
};

// 페이지 로딩 시 초기 설정 호출
initializePage();