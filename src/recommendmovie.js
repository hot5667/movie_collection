import { DEFAPIKEY } from './apikey.js';
const { API_KEY, BASEURL } = DEFAPIKEY;

// JSON 파일에서 영화 데이터를 불러오는 함수
const FETCH_MOVIES_FROM_JSON = async () => {
  try {
    const RESPONSE = await fetch('/json/movies.json');
    if (!RESPONSE.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
    return await RESPONSE.json();
  } catch (ERROR) {
    console.error('영화 데이터를 가져오는데 실패했습니다:', ERROR);
    return [];
  }
};

// 특정 영화 ID를 사용해 영화 정보를 가져오는 함수
const FETCH_MOVIE_DETAILS = async (MOVIE_ID) => {
  const URL = `${BASEURL}3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=ko-KR`;
  try {
    const RESPONSE = await fetch(URL);
    if (!RESPONSE.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
    return await RESPONSE.json();
  } catch (ERROR) {
    console.error('영화 정보를 가져오는데 실패했습니다:', ERROR);
    return null;
  }
};

// 뱃지 생성 함수
const CREATE_BADGE = (NAME) => {
  const BADGE = document.createElement('span');
  BADGE.classList.add('movie-badge');
  BADGE.textContent = NAME;
  return BADGE;
};

// 영화 카드 생성 함수
const CREATE_MOVIE_CARD = (MOVIE_DATA) => {
  const CARD = document.createElement('div');
  CARD.classList.add('movie-card');
  CARD.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${MOVIE_DATA.poster_path || 'https://via.placeholder.com/200x300'}" alt="${MOVIE_DATA.title} 포스터" class="movie-poster">
  `;

  const BADGE = CREATE_BADGE(MOVIE_DATA.name); // `name` 필드가 추가된 영화 데이터 사용
  CARD.appendChild(BADGE);

  CARD.addEventListener('click', () => {
    window.location.href = `/html/movie_detail.html?id=${MOVIE_DATA.id}`;
  });

  return CARD;
};

// 영화 데이터를 HTML로 변환하여 표시하는 함수
const DISPLAY_MOVIES = async (CONTAINER_ID) => {
  const MOVIES = await FETCH_MOVIES_FROM_JSON();
  const CONTAINER = document.getElementById(CONTAINER_ID);
  
  if (!CONTAINER) {
    console.error(`컨테이너 ${CONTAINER_ID}를 찾을 수 없습니다.`);
    return;
  }

  CONTAINER.innerHTML = ''; // 기존 내용을 지우기

  for (const MOVIE of MOVIES) {
    const MOVIE_DATA = await FETCH_MOVIE_DETAILS(MOVIE.id);
    if (MOVIE_DATA) {
      // MOVIE 데이터에 name을 추가합니다.
      MOVIE_DATA.name = MOVIE.name;
      const CARD = CREATE_MOVIE_CARD(MOVIE_DATA);
      CONTAINER.appendChild(CARD);
    }
  }
};

// 캐러셀에 영화 표시 함수
const DISPLAY_MOVIES_CAROUSEL = async (CAROUSEL_ID) => {
  const MOVIES = await FETCH_MOVIES_FROM_JSON();
  const CAROUSEL = document.getElementById(CAROUSEL_ID);
  
  if (!CAROUSEL) {
    console.error(`캐러셀 ${CAROUSEL_ID}를 찾을 수 없습니다.`);
    return;
  }

  for (const MOVIE of MOVIES) {
    const MOVIE_DATA = await FETCH_MOVIE_DETAILS(MOVIE.id);
    if (MOVIE_DATA) {
      // MOVIE 데이터에 name을 추가합니다.
      MOVIE_DATA.name = MOVIE.name;
      const CARD = CREATE_MOVIE_CARD(MOVIE_DATA);
      CAROUSEL.appendChild(CARD);
    }
  }

  SETUP_CAROUSEL_NAVIGATION(CAROUSEL_ID);
};

// 캐러셀 네비게이션 설정 함수
const SETUP_CAROUSEL_NAVIGATION = (CAROUSEL_ID) => {
  const CAROUSEL = document.getElementById(CAROUSEL_ID);
  const PREV_BTN = document.querySelector(`#${CAROUSEL_ID.replace('-track', '')} .prev-btn`);
  const NEXT_BTN = document.querySelector(`#${CAROUSEL_ID.replace('-track', '')} .next-btn`);

  if (!CAROUSEL || !PREV_BTN || !NEXT_BTN) {
    console.error('캐러셀 요소를 찾을 수 없습니다.');
    return;
  }

  // 카드의 너비를 동적으로 계산
  const CARD_WIDTH = CAROUSEL.children[0]?.offsetWidth || 0;

  // 스크롤 시 최댓값과 최솟값을 설정
  const MAX_SCROLL_LEFT = CAROUSEL.scrollWidth - CAROUSEL.clientWidth;
  
  let currentScroll = 0;

  NEXT_BTN.addEventListener('click', () => {
    // 오른쪽으로 스크롤
    currentScroll += CARD_WIDTH;
    if (currentScroll > MAX_SCROLL_LEFT) {
      currentScroll = MAX_SCROLL_LEFT; // 최대 스크롤 위치 제한
    }
    CAROUSEL.scrollTo({
      left: currentScroll,
      behavior: 'smooth',
    });
  });

  PREV_BTN.addEventListener('click', () => {
    // 왼쪽으로 스크롤
    currentScroll -= CARD_WIDTH;
    if (currentScroll < 0) {
      currentScroll = 0; // 최소 스크롤 위치 제한
    }
    CAROUSEL.scrollTo({
      left: currentScroll,
      behavior: 'smooth',
    });
  });
};

// 페이지 요소 표시/숨김 함수
const TOGGLE_PAGE_ELEMENTS = (PAGE) => {
  const CONTAINER = document.querySelector('.container');
  const CAROUSELS = document.querySelectorAll('.movie-carousel');
  const MOVIES_CONTAINER = document.querySelector('.moive-main-container');
  const NAVIGATION_CONTAINER = document.querySelector('.movies-navigation-container');

  CONTAINER.style.display = 'none';
  CAROUSELS.forEach((CAROUSEL) => (CAROUSEL.style.display = 'none'));
  MOVIES_CONTAINER.style.display = 'none';
  NAVIGATION_CONTAINER.style.display = 'none';

  switch (PAGE) {
    case 'main':
      CONTAINER.style.display = 'block';
      CAROUSELS.forEach((CAROUSEL) => (CAROUSEL.style.display = 'block'));
      break;
    case 'choice':
      NAVIGATION_CONTAINER.style.display = 'flex';
      break;
    case 'hot':
      NAVIGATION_CONTAINER.style.display = 'flex';
      break;
    case 'views':
      CONTAINER.style.display = 'block';
      MOVIES_CONTAINER.style.display = 'flex';
      break;
  }
};

// 네비게이션 이벤트 리스너 추가
const SETUP_NAVIGATION_LINKS = () => {
  document.getElementById('views-link_Hot').addEventListener('click', (EVENT) => {
    EVENT.preventDefault();
    TOGGLE_PAGE_ELEMENTS('hot');
    history.pushState(null, '', '#Hot');
  });

  document.getElementById('views-link_Views').addEventListener('click', (EVENT) => {
    EVENT.preventDefault();
    TOGGLE_PAGE_ELEMENTS('views');
    history.pushState(null, '', '#Views');
  });

  document.getElementById('views-link_Choice').addEventListener('click', (EVENT) => {
    EVENT.preventDefault();
    TOGGLE_PAGE_ELEMENTS('choice');
    DISPLAY_MOVIES('movies-navigation-container');
    history.pushState(null, '', '#Choice');
  });
};

// 메인 페이지로 돌아가는 함수
const RETURN_TO_MAIN_PAGE = () => {
  TOGGLE_PAGE_ELEMENTS('main');
  DISPLAY_MOVIES_CAROUSEL('choice-movie-carousel-track');
  history.pushState(null, '', '/');
};

// 뒤로가기 이벤트 처리
const HANDLE_POP_STATE = () => {
  switch (location.hash) {
    case '#Choice':
      TOGGLE_PAGE_ELEMENTS('choice');
      DISPLAY_MOVIES('movies-navigation-container');
      break;
    case '#Hot':
      TOGGLE_PAGE_ELEMENTS('hot');
      break;
    case '#Views':
      TOGGLE_PAGE_ELEMENTS('views');
      break;
    default:
      RETURN_TO_MAIN_PAGE();
  }
};

// 초기 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  SETUP_NAVIGATION_LINKS();
  RETURN_TO_MAIN_PAGE();
});

window.addEventListener('popstate', HANDLE_POP_STATE);