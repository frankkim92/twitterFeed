# Twitter Feed Clone

Next.js와 TypeScript, Tailwind CSS로 만든 트위터 피드 프로젝트입니다.

##  시작하기

### 1. 의존성 설치

npm install### 2. 개발 서버 실행

npm run dev브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

##  사용한 기술 스택 및 선택 이유

- **Framework**: Next.js 15
  - React 기반의 풀스택 프레임워크로 App Router와 서버 컴포넌트를 활용한 최신 개발 경험 제공
  - 빠른 개발 환경과 최적화된 프로덕션 빌드

- **Language**: TypeScript
  - 타입 안정성을 통한 런타임 에러 사전 방지
  - 코드 자동완성과 리팩토링의 용이성으로 개발 생산성 향상

- **Styling**: Tailwind CSS
  - 유틸리티 우선 접근 방식으로 빠른 UI 개발
  - 일관된 디자인 시스템 구축 및 반응형 디자인 간편 구현

##  구현한 기능 목록

### 📝 게시물 작성
- 280자 제한 텍스트 입력
- 이미지 첨부 및 미리보기
- 실시간 글자 수 카운터 및 진행률 표시
- 작성한 게시물 LocalStorage 저장

###  피드
- 무한 스크롤 (Intersection Observer)
- 10개씩 페이지네이션
- 로딩 상태 표시
- 시간순 정렬

###  인터랙션
- 좋아요 토글 (카운트 증가/감소)
- 리트윗 기능 (피드에 리트윗 게시물 추가)
- 상대적 시간 표시 (N초/분/시간/일 전)

###  UI/UX
- Twitter/X 스타일 다크 테마
- 반응형 디자인
- 호버 효과 및 애니메이션
