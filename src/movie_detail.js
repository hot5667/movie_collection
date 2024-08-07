// API 키와 옵션 임포트
import { DEFAPIKEY } from './apikey.js';
const { API_KEY, options, BASEURL } = DEFAPIKEY;

// 영화 ID를 URL 쿼리 파라미터에서 가져오기
const URLPARAMS = new URLSearchParams(window.location.search);
const MOVIEID = URLPARAMS.get('id');

// HTML 요소 가져오기
const MOVIEPOSTER = document.getElementById('movie_poster');
const MOVIETITLE = document.getElementById('movie_title');
const MOVIETAGLINE = document.getElementById('movie_tagline');
const MOVIEVOTEAVERAGE = document.getElementById('movie_vote_average');
const MOVIEGENRES = document.getElementById('movie_genres');
const MOVIERELEASEDATE = document.getElementById('movie_release_date');
const MOVIERUNTIME = document.getElementById('movie_runtime');
const MOVIEOVERVIEWTEXT = document.getElementById('movie_overview_text');

// 로고 요소 가져오기
const LOGO = document.getElementById('logo');

// 로고 클릭 이벤트 리스너 추가
LOGO.addEventListener('click', function (event) {
  event.preventDefault(); // 기본 동작 방지
  window.history.back(); // 이전 페이지로 이동
});

// 영화 상세 정보를 가져오는 비동기 함수
async function getMovieDetails() {
  try {
    const URL = `${BASEURL}3/movie/${MOVIEID}?api_key=${API_KEY}&language=ko-KR`;
    console.log(`Fetching movie details from: ${URL}`);

    const RESPONSE = await fetch(URL, options);

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    }

    const MOVIE = await RESPONSE.json();
    console.log('Received movie details:', MOVIE);

    // 영화 상세 정보를 페이지에 표시
    MOVIEPOSTER.src = `https://image.tmdb.org/t/p/w500/${MOVIE.poster_path}`;
    MOVIETITLE.textContent = MOVIE.title;
    MOVIETAGLINE.textContent = MOVIE.tagline;
    MOVIEVOTEAVERAGE.textContent = '평점 : ' + MOVIE.vote_average.toFixed(1);
    MOVIEGENRES.innerHTML = MOVIE.genres
      .map((genre) => `<span class="genre">${genre.name}</span>`)
      .join(', ');
    MOVIERELEASEDATE.textContent = `상영날짜 ${MOVIE.release_date}`;
    MOVIERUNTIME.textContent = `상영시간: ${MOVIE.runtime} 분`;
    MOVIEOVERVIEWTEXT.textContent = MOVIE.overview;
  } catch (error) {
    console.log('Error fetching movie details:', error);
  }
}

// 영화 상세 정보 가져오기 호출
getMovieDetails();
