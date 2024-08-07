// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener('DOMContentLoaded', function () {
  // 각 슬라이드에 대한 버튼 정보를 담은 배열
  const BUTTONS = [
    { id: 'Madame_web', movieId: 634492, index: 0 },
    { id: 'The_hobbit', movieId: 122917, index: 1 },
    { id: 'Joker', movieId: 889737, index: 2 },
  ];

  // 모든 슬라이드 아이템을 선택
  const SLIDEITEMS = document.querySelectorAll('.slide-item');

  // 버튼 위치를 업데이트하는 함수
  function updateButtonPositions() {
    BUTTONS.forEach((button, index) => {
      const SHORTCUT_BUTTON = document.getElementById(button.id);
      const INFO_BUTTON = document.getElementById(`information_${button.id}`);

      if (SHORTCUT_BUTTON && INFO_BUTTON) {
        // 각 슬라이드에 대해 버튼 위치 계산
        const left = `${2 + index * 100}%`;
        // '바로가기' 버튼 위치 설정
        SHORTCUT_BUTTON.style.left = left;
        SHORTCUT_BUTTON.style.top = '20px';
        // '상세정보' 버튼 위치 설정 ('바로가기' 버튼 오른쪽에)
        INFO_BUTTON.style.left = `calc(${left} + 110px)`;
        INFO_BUTTON.style.top = '20px';
      }
    });
  }

  // 각 버튼에 대한 처리
  BUTTONS.forEach((button, index) => {
    const SLIDE_ITEM = SLIDEITEMS[button.index];

    // '바로가기' 버튼 생성
    const SHORTCUT_BUTTON = document.createElement('button');
    SHORTCUT_BUTTON.className = 'shortcuts';
    SHORTCUT_BUTTON.id = button.id;
    SHORTCUT_BUTTON.textContent = '바로가기';
    SHORTCUT_BUTTON.style.position = 'absolute'; // 절대 위치 설정

    // '상세정보' 버튼 생성
    const INFO_BUTTON = document.createElement('button');
    INFO_BUTTON.className = 'information';
    INFO_BUTTON.id = `information_${button.id}`;
    INFO_BUTTON.innerHTML = '<i class="fas fa-info-circle"></i> 상세정보';
    INFO_BUTTON.style.position = 'absolute'; // 절대 위치 설정

    // 생성한 버튼들을 해당 슬라이드 아이템에 추가
    SLIDE_ITEM.appendChild(SHORTCUT_BUTTON);
    SLIDE_ITEM.appendChild(INFO_BUTTON);

    // '바로가기' 버튼 클릭 이벤트 리스너
    SHORTCUT_BUTTON.addEventListener('click', function () {
      window.location.href = `/html/movie_detail.html?id=${button.movieId}`;
    });

    // '상세정보' 버튼 클릭 이벤트 리스너
    INFO_BUTTON.addEventListener('click', function () {
      window.location.href = `/html/movie_detail.html?id=${button.movieId}`;
    });
  });

  // 초기 버튼 위치 설정
  updateButtonPositions();

  // 창 크기 변경 시 버튼 위치 업데이트
  window.addEventListener('resize', updateButtonPositions);
});
