# Twitter Feed Clone

Next.js와 TypeScript, Tailwind CSS로 만든 트위터 피드 클론 프로젝트입니다.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
socialMedia/
├── app/
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지
│   └── globals.css      # 글로벌 스타일
├── components/
│   ├── Sidebar.tsx      # 왼쪽 사이드바 (네비게이션)
│   ├── Feed.tsx         # 중앙 피드
│   ├── TweetBox.tsx     # 트윗 작성 박스
│   ├── Post.tsx         # 개별 포스트
│   └── Widgets.tsx      # 오른쪽 위젯 (트렌드, 팔로우 추천)
└── ...
```

## 주요 기능 (구현 예정)

- [ ] 트윗 작성
- [ ] 트윗 목록 표시
- [ ] 좋아요 기능
- [ ] 리트윗 기능
- [ ] 댓글 기능
- [ ] 이미지 업로드
- [ ] 사용자 프로필
- [ ] 실시간 업데이트

## 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 18

## 다음 단계

이제 각 컴포넌트에 기능을 추가하면 됩니다:

1. **TweetBox.tsx**: 실제 트윗 작성 및 저장 로직
2. **Post.tsx**: 좋아요, 리트윗, 댓글 기능
3. **Feed.tsx**: 실제 데이터 페칭 및 상태 관리
4. **Sidebar.tsx**: 라우팅 및 네비게이션
5. **Widgets.tsx**: 실시간 트렌드 데이터

즐거운 코딩 되세요! 🚀

