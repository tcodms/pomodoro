# 포모도로 타이머 프로젝트

## 개요
순수 HTML/CSS/JS로 만든 포모도로 타이머 웹앱.
서버 없이 `index.html`을 브라우저에서 바로 열어 사용 가능.

## 파일 구조
```
new/
├── index.html           # 레이아웃 및 구조
├── style.css            # 스타일 (맥 앱 스타일 화이트 테마)
├── script.js            # 타이머 로직
├── phomodoro_example.webp  # UI 디자인 참고 이미지
└── CLAUDE.md            # 이 파일
```

## 구현된 기능
- 25분 집중 / 5분 휴식 타이머
- 시작 / 일시정지 / 리셋 / 모드 전환 버튼
- 세션 카운터 (4세션 = 1사이클, 점으로 표시)
- 타이머 종료 시 Web Audio API 알림음
- 집중/휴식 모드 색상 전환 (코랄 ↔ 청록)

## UI 디자인
`phomodoro_example.webp` 이미지를 참고해 맥 앱 스타일로 제작.

- **배경**: 연회색 (`#e8e8e8`)
- **윈도우 카드**: 흰색, 둥근 모서리, 그림자
- **맥 트래픽 라이트**: 빨강/노랑/초록 점
- **클락페이스 타이머**: SVG 파이 웨지 방식, 60개 눈금 + 숫자
- **중앙 재생버튼**: 클락 중앙 오버레이
- **강조색**: 코랄 `#e8716a` (집중) / 청록 `#0f9b8e` (휴식)
- **시간 표시**: 4rem 볼드 숫자

## script.js 주요 함수
| 함수 | 역할 |
|---|---|
| `init()` | 클락페이스 생성, 초기 렌더링 |
| `generateClockFace()` | SVG 눈금·숫자 동적 생성 |
| `toggleTimer()` | 시작/일시정지 토글 |
| `startTimer()` | setInterval 카운트다운 |
| `pauseTimer()` | clearInterval |
| `resetTimer()` | 현재 모드 기본값으로 초기화 |
| `switchMode()` | 집중 ↔ 휴식 전환 |
| `updateProgress()` | SVG 파이 웨지 업데이트 |
| `playBeep()` | Web Audio API 알림음 |

## Git
- 원격 저장소: `https://github.com/tcodms/pomodoro.git`
- 브랜치: `main`
- 초기 커밋: `feat: 포모도로 타이머 초기 구현`

## 변경 이력
1. **초기 구현** — 다크 테마, SVG 링 방식 타이머
2. **화이트 톤 변경** — 배경/카드/버튼 색상을 밝은 계열로 교체
3. **UI 전면 개편** — 맥 앱 스타일, 파이 웨지 클락페이스 적용
