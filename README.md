# 스파르타 내일배움캠프 6기 5조 “너는 이미 코딩하고 있다”

## 팀원 소개

- 김도현: [Velog](https://velog.io/@hot5667/posts)
- 이준: [Tistory](https://www.tistory.com/member/blog)
- 엄지훈: [Velog](https://velog.io/@djawlgns0924/posts)
- 조현준: [Velog](https://velog.io/@johj703/posts)
- 최지민: [Tistory](https://choijming21.tistory.com)

## 목차

1. 프로젝트 소개
2. 구현 기능
3. 배포 주소
4. 팀 규칙 및 깃 컨벤션
5. 역할 분담

## 프로젝트 소개

**“너이영”** 너는 이미 영화를 보고 있다!  
인기 영화 목록, 팀원별 추천 영화, 영화 검색을 볼 수 있는 자바스크립트를 이용한 플랫폼입니다.

## 구현 기능

- TMDB API 영화 정보 불러오기
- 반응형 웹
- 영화 리뷰 작성, 수정 및 삭제 (Firebase 사용, Firestore)
- 영화 이름으로 검색, 이벤트 처리
- 캐러셀
- 반응형 웹, 모바일, 데스크톱

## 배포 주소

## 와이어프레임

피그마 사용  
[와이어프레임 링크](https://www.figma.com/design/VUlsHs7mn6qfRHtk1qZ0ht/Untitled?node-id=0-1&t=U7HTrdgbZVIiVZNV-1)

## 팀 규칙

- 스크럼, 출석 잘 하기!
- TIL 잘 제출하기

## 깃 코드 컨벤션

- **변수**
  ```javascript
  const MAX_SIZE = 10; // 상수 일때만 변수명 대문자로
  let $num = 5; // 실수, 정수, 소수
  let $name = "dohyun"; // 문자열, 소수, 실수, 정수 일때만 $변수
  const MAX_SIZE = 10; // 상수 일때만 변수명 대문자로

- **함수**
  camelCase로 진행 부탁드립니다.

- 최대한 많은 commit으로 충돌 줄이기, 
- dev 파일과 각각의 branch를 만들어서 각자 코드 생성 후
  깃 커밋 푸쉬 풀 받아오기

## 역할 분담
  - 김도현
      - 네비게이션 디자인 퍼블리싱
      - 평점, 뱃지, 너이영 추천 영화 페이지 제작

  - 이준
      - 디테일 페이지 리뷰 작성
      - FireBase 사용하여 작성자, 비밀번호, 리뷰창 생성, 리뷰 작성 HTML, CSS 페이지 작성
      - 작성자, 비밀번호 리뷰 데이터 넣기, 리뷰 수정 및 삭제 기능 시도
      - 발표 PPT 제작

  - 임지훈
      - Figma 와이어 프레임 제작
      - 캐러셀 배너 구현
      - 영화 배너 제작

  - 조현준
      - 영화 디테일 페이지 제작
      - 메인 페이지 영화 캐러셀 갭 수정
      - 메인 페이지에서 캐러셀 클릭 이벤트 생성

  - 최지민
      - 영화 검색 기능 고도화
      - 프로젝트 소개 구문 작성
      - 카드 불러오기 중복 오류 해결
      - 로컬 스토리지 사용하여 영화 검색 기능 구현
      - 영화 제목 제작
      - 최고의 평점 제작
      - 너이영 추천 카드 캐러셀로 제작


## 기종별 와이어 프레임

### iPad Pro 메인 화면
<img src="https://velog.velcdn.com/images/johj703/post/7f392caa-0f2b-4196-a2e4-c9d0d44b12f4/image.png" />

### iPad Pro 상세 화면
<img src="https://velog.velcdn.com/images/johj703/post/e658a6b4-71b1-4325-b66c-9777c8f57e5b/image.png" />

### iPhone 12 Pro 메인 화면
<img src="https://velog.velcdn.com/images/johj703/post/d92b2d91-fa26-49ef-ba14-8e238d440301/image.png" />

### iPhone 12 Pro 상세 화면
<img src="https://velog.velcdn.com/images/johj703/post/f6968d89-e282-41fe-b474-27b2eac3beb0/image.png" />

### 갤럭시 Z 폴드 접었을 때 메인 화면
<img src="https://velog.velcdn.com/images/johj703/post/b9966846-ce63-4de8-a6a1-82b8b4450db4/image.png" />

### 갤럭시 Z 폴드 접었을 때 상세 화면
<img src="https://velog.velcdn.com/images/johj703/post/64ab3161-cc15-4dc4-be82-09ebc5546337/image.png" />

### 갤럭시 Z 폴드 폈을 때 메인 화면
<img src="https://velog.velcdn.com/images/johj703/post/25f96896-91dc-4230-95f8-1937266d1b19/image.png" />

### 갤럭시 Z 폴드 폈을 때 상세 화면
<img src="https://velog.velcdn.com/images/johj703/post/b78bc7ef-fc88-4b1b-8528-5ad42db9910a/image.png" />

### PC(16:9) 해상도 메인 화면(평상시 PC환경)
<img src="https://velog.velcdn.com/images/johj703/post/6079dedb-634a-4f6c-888f-b4f29031d071/image.png" />

### PC(16:9) 해상도 상세 화면(평상시 PC환경)
<img src="https://velog.velcdn.com/images/johj703/post/83049853-9fe7-4166-925c-73727dfbd4e4/image.png" />

### PC(16:10) 해상도 메인 화면(노트북 환경)
<img src="https://velog.velcdn.com/images/johj703/post/9ad77493-3983-45af-ab80-0aa2017be4a2/image.png" />

### PC(16:10) 해상도 상세 화면(노트북 환경)
<img src="https://velog.velcdn.com/images/johj703/post/cd61e055-808c-4e3b-8678-0988491b7d24/image.png" />
