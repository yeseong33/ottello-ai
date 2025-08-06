# 오셀로 (리버시) 게임

React와 TypeScript로 구현한 오셀로(리버시) 게임입니다.

## 기능

- 8×8 보드에서 2인 대전
- 흑백 돌을 교대로 배치
- 상대의 돌을 끼우면 자신의 색으로 변환
- 유효한 수 강조 표시 (노란색 테두리와 애니메이션)
- 현재 턴과 점수 실시간 표시
- 게임 종료 시 승패 판정
- 아름다운 UI (Tailwind CSS 사용)

## 실행 방법

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 게임 규칙

1. **시작**: 흑돌이 먼저 시작합니다
2. **배치**: 상대방의 돌을 자신의 돌로 끼울 수 있는 위치에만 돌을 놓을 수 있습니다
3. **뒤집기**: 돌을 놓으면 끼워진 상대방의 돌들이 모두 자신의 색으로 바뀝니다
4. **턴 넘김**: 놓을 수 있는 곳이 없으면 턴이 상대방에게 넘어갑니다
5. **종료**: 보드가 가득 차거나 양쪽 모두 놓을 곳이 없으면 게임이 종료됩니다
6. **승부**: 더 많은 돌을 가진 쪽이 승리합니다

## 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── OthelloBoard.tsx # 게임 보드 컴포넌트
│   └── GameInfo.tsx     # 게임 정보 표시 컴포넌트
├── utils/              # 유틸리티
│   └── OthelloGame.ts  # 게임 로직 클래스
├── App.tsx             # 메인 App 컴포넌트
├── main.tsx           # 애플리케이션 진입점
└── index.css          # 전역 스타일
```