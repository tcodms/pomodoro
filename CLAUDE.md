# Pomodoro Together

## 프로젝트 목표
혼자 공부하지만 다른 사람들과 함께 공부하는 느낌을 주는 뽀모도로 타이머 서비스.
기존 HTML/CSS/JS 타이머를 React + Spring Boot 풀스택으로 확장 중.

## 기술 스택
- Frontend: React (Vite)
- Backend: Spring Boot 3, Java 21, Gradle
- DB: PostgreSQL
- 실시간: WebSocket (STOMP)
- 인증: Spring Security + JWT

## UI 스타일 가이드 (기존 디자인 유지)
- 맥 앱 스타일 화이트 테마, 둥근 모서리, 그림자
- 집중 강조색: 코랄 `#e8716a` / 휴식 강조색: 청록 `#0f9b8e`
- 타이머: SVG 파이 웨지 클락페이스 방식 (반지름 110, 60개 눈금)
- 중앙 재생버튼 오버레이 구조 유지

## 주요 기능
- 개인 뽀모도로 타이머 (25분 집중 / 5분 휴식)
- 다른 사용자 타이머 실시간 표시 (읽기 전용)
- 방(Room) 코드로 친구 초대
- 회원가입 / 로그인

## 현재 파일 구조
```
pomodoro-together/
├── index.html       # 기존 바닐라 구현 (참고용)
├── style.css
├── script.js
└── CLAUDE.md
```

## 언어 설정
- 모든 응답, 질문, 확인 메시지는 반드시 한국어로 작성할 것
- 코드 주석 제외한 모든 커뮤니케이션은 한국어 사용

## 개발 규칙
- React 컴포넌트는 src/components/ 에 분리
- Spring Boot 패키지: controller / service / repository / entity / dto
- Lombok 사용 허용
- 친구 타이머는 서버에서 startedAt 받아서 프론트에서 계산
