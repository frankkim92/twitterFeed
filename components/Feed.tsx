'use client';

import { useState, useEffect, useRef } from 'react';
import TweetBox from './TweetBox';
import Post from './Post';

const mockPosts = [
  {
    id: 1,
    author: {
      name: '김개발',
      username: 'kimdev',
      profileImage: 'https://picsum.photos/40/40?random=1',
      verified: true,
    },
    content:
      '오늘 React 18의 새로운 기능들을 공부했습니다! Concurrent Features가 정말 흥미롭네요 🚀 #React #개발자',
    images: ['https://picsum.photos/500/300?random=1'],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 42,
    retweets: 12,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 2,
    author: {
      name: '이디자인',
      username: 'leedesign',
      profileImage: 'https://picsum.photos/40/40?random=2',
      verified: false,
    },
    content:
      '새로운 디자인 시스템을 만들고 있어요. 일관성 있는 컴포넌트 라이브러리의 중요성을 다시 한번 느낍니다 ✨',
    images: [],
    createdAt: '2024-01-15T09:15:00Z',
    likes: 28,
    retweets: 5,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 3,
    author: {
      name: '박프론트',
      username: 'parkfront',
      profileImage: 'https://picsum.photos/40/40?random=3',
      verified: true,
    },
    content:
      'TypeScript 5.0 업데이트 내용 정리했습니다! Decorators 정식 지원이 가장 기대되네요 💪',
    images: ['https://picsum.photos/500/300?random=3'],
    createdAt: '2024-01-15T08:45:00Z',
    likes: 156,
    retweets: 34,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 4,
    author: {
      name: '최백엔드',
      username: 'choibackend',
      profileImage: 'https://picsum.photos/40/40?random=4',
      verified: false,
    },
    content:
      'Node.js 20 LTS 버전으로 마이그레이션 완료! 성능이 확실히 좋아진 것 같아요 🚀',
    images: [],
    createdAt: '2024-01-15T07:20:00Z',
    likes: 89,
    retweets: 15,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 5,
    author: {
      name: '정풀스택',
      username: 'jeongfullstack',
      profileImage: 'https://picsum.photos/40/40?random=5',
      verified: true,
    },
    content:
      'Next.js 15 App Router로 프로젝트 리팩토링 중입니다. Server Components 정말 강력하네요! 👍',
    images: ['https://picsum.photos/500/300?random=5'],
    createdAt: '2024-01-15T06:10:00Z',
    likes: 203,
    retweets: 45,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 6,
    author: {
      name: '강모바일',
      username: 'kangmobile',
      profileImage: 'https://picsum.photos/40/40?random=6',
      verified: false,
    },
    content:
      'React Native 새 프로젝트 시작! 크로스 플랫폼 개발 너무 재밌어요 📱',
    images: [],
    createdAt: '2024-01-15T05:30:00Z',
    likes: 67,
    retweets: 8,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 7,
    author: {
      name: '윤데브옵스',
      username: 'yoondevops',
      profileImage: 'https://picsum.photos/40/40?random=7',
      verified: true,
    },
    content:
      'Docker Compose로 개발 환경 구축 완료! 이제 팀원들이 쉽게 환경 세팅할 수 있겠네요 🐳',
    images: ['https://picsum.photos/500/300?random=7'],
    createdAt: '2024-01-15T04:15:00Z',
    likes: 124,
    retweets: 29,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 8,
    author: {
      name: '임UI',
      username: 'limui',
      profileImage: 'https://picsum.photos/40/40?random=8',
      verified: false,
    },
    content:
      'Tailwind CSS 커스텀 테마 만들기 완료! 디자인 시스템 구축 재밌네요 🎨',
    images: [],
    createdAt: '2024-01-15T03:00:00Z',
    likes: 91,
    retweets: 18,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 9,
    author: {
      name: '송데이터',
      username: 'songdata',
      profileImage: 'https://picsum.photos/40/40?random=9',
      verified: true,
    },
    content: 'GraphQL API 설계 중입니다. REST보다 확실히 유연하네요! 💡',
    images: ['https://picsum.photos/500/300?random=9'],
    createdAt: '2024-01-15T02:45:00Z',
    likes: 178,
    retweets: 41,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 10,
    author: {
      name: '한테스트',
      username: 'hantest',
      profileImage: 'https://picsum.photos/40/40?random=10',
      verified: false,
    },
    content: 'Jest + Testing Library로 테스트 커버리지 90% 달성! 🎯',
    images: [],
    createdAt: '2024-01-15T01:30:00Z',
    likes: 145,
    retweets: 32,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 11,
    author: {
      name: '오보안',
      username: 'ohsecurity',
      profileImage: 'https://picsum.photos/40/40?random=11',
      verified: true,
    },
    content: 'OAuth 2.0 인증 시스템 구현 완료! 보안은 역시 중요해요 🔒',
    images: ['https://picsum.photos/500/300?random=11'],
    createdAt: '2024-01-14T23:20:00Z',
    likes: 210,
    retweets: 56,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 12,
    author: {
      name: '서클라우드',
      username: 'seocloud',
      profileImage: 'https://picsum.photos/40/40?random=12',
      verified: false,
    },
    content:
      'AWS Lambda로 서버리스 아키텍처 구축 중! 비용 절감 효과가 크네요 ☁️',
    images: [],
    createdAt: '2024-01-14T22:10:00Z',
    likes: 98,
    retweets: 22,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 13,
    author: {
      name: '황AI',
      username: 'hwangai',
      profileImage: 'https://picsum.photos/40/40?random=13',
      verified: true,
    },
    content: 'ChatGPT API 연동해서 챗봇 만들었어요! AI 시대가 왔네요 🤖',
    images: ['https://picsum.photos/500/300?random=13'],
    createdAt: '2024-01-14T21:00:00Z',
    likes: 312,
    retweets: 78,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 14,
    author: {
      name: '조성능',
      username: 'joperf',
      profileImage: 'https://picsum.photos/40/40?random=14',
      verified: false,
    },
    content: 'Lighthouse 점수 100점 달성! 웹 성능 최적화 완료 ⚡',
    images: [],
    createdAt: '2024-01-14T20:15:00Z',
    likes: 187,
    retweets: 43,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 15,
    author: {
      name: '유애니메이션',
      username: 'youanimate',
      profileImage: 'https://picsum.photos/40/40?random=15',
      verified: true,
    },
    content:
      'Framer Motion으로 멋진 애니메이션 구현! 사용자 경험이 확 달라지네요 ✨',
    images: ['https://picsum.photos/500/300?random=15'],
    createdAt: '2024-01-14T19:30:00Z',
    likes: 156,
    retweets: 38,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 16,
    author: {
      name: '문데이터베이스',
      username: 'moondb',
      profileImage: 'https://picsum.photos/40/40?random=16',
      verified: false,
    },
    content: 'PostgreSQL 쿼리 최적화로 응답 속도 10배 향상! 인덱스의 힘 💪',
    images: [],
    createdAt: '2024-01-14T18:45:00Z',
    likes: 134,
    retweets: 29,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 17,
    author: {
      name: '신블록체인',
      username: 'shinblock',
      profileImage: 'https://picsum.photos/40/40?random=17',
      verified: true,
    },
    content: 'Web3 DApp 개발 시작! 블록체인 기술 정말 흥미진진해요 ⛓️',
    images: ['https://picsum.photos/500/300?random=17'],
    createdAt: '2024-01-14T17:20:00Z',
    likes: 223,
    retweets: 61,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 18,
    author: {
      name: '권접근성',
      username: 'kwona11y',
      profileImage: 'https://picsum.photos/40/40?random=18',
      verified: false,
    },
    content: '웹 접근성 개선 작업 완료! 모두를 위한 웹을 만들어요 ♿',
    images: [],
    createdAt: '2024-01-14T16:10:00Z',
    likes: 167,
    retweets: 44,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 19,
    author: {
      name: '배컨테이너',
      username: 'baecontainer',
      profileImage: 'https://picsum.photos/40/40?random=19',
      verified: true,
    },
    content: 'Kubernetes 클러스터 구축 완료! 오케스트레이션의 세계 🚢',
    images: ['https://picsum.photos/500/300?random=19'],
    createdAt: '2024-01-14T15:00:00Z',
    likes: 198,
    retweets: 52,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 20,
    author: {
      name: '안모니터링',
      username: 'anmonitor',
      profileImage: 'https://picsum.photos/40/40?random=20',
      verified: false,
    },
    content: 'Grafana + Prometheus로 실시간 모니터링 대시보드 구축! 📊',
    images: [],
    createdAt: '2024-01-14T14:30:00Z',
    likes: 142,
    retweets: 35,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 21,
    author: {
      name: '진마이크로서비스',
      username: 'jinmicro',
      profileImage: 'https://picsum.photos/40/40?random=21',
      verified: true,
    },
    content: '마이크로서비스 아키텍처로 전환 성공! 확장성이 정말 좋아요 🏗️',
    images: ['https://picsum.photos/500/300?random=21'],
    createdAt: '2024-01-14T13:15:00Z',
    likes: 276,
    retweets: 71,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 22,
    author: {
      name: '홍리팩토링',
      username: 'hongrefactor',
      profileImage: 'https://picsum.photos/40/40?random=22',
      verified: false,
    },
    content: '레거시 코드 리팩토링 완료! 클린 코드의 중요성을 다시 느껴요 🧹',
    images: [],
    createdAt: '2024-01-14T12:00:00Z',
    likes: 189,
    retweets: 47,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 23,
    author: {
      name: '장CI/CD',
      username: 'jangcicd',
      profileImage: 'https://picsum.photos/40/40?random=23',
      verified: true,
    },
    content: 'GitHub Actions로 CI/CD 파이프라인 구축! 자동화 최고 🔄',
    images: ['https://picsum.photos/500/300?random=23'],
    createdAt: '2024-01-14T11:30:00Z',
    likes: 234,
    retweets: 58,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 24,
    author: {
      name: '노캐시',
      username: 'nocache',
      profileImage: 'https://picsum.photos/40/40?random=24',
      verified: false,
    },
    content: 'Redis 캐싱 전략으로 API 응답 속도 5배 향상! ⚡',
    images: [],
    createdAt: '2024-01-14T10:45:00Z',
    likes: 167,
    retweets: 41,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 25,
    author: {
      name: '도메시지큐',
      username: 'domq',
      profileImage: 'https://picsum.photos/40/40?random=25',
      verified: true,
    },
    content: 'RabbitMQ로 비동기 처리 구현! 시스템 안정성이 높아졌어요 📨',
    images: ['https://picsum.photos/500/300?random=25'],
    createdAt: '2024-01-14T09:20:00Z',
    likes: 201,
    retweets: 54,
    isLiked: false,
    isRetweeted: true,
  },
];

const fetchPosts = async (page = 1, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockPosts.slice((page - 1) * limit, page * limit);
};

export default function Feed() {
  const currentUser = {
    id: 'abc123',
    name: '김트윗',
    username: 'frank',
    profileImage: 'https://picsum.photos/40/40?random=99',
    verified: false,
  };

  const [posts, setPosts] = useState<typeof mockPosts>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userPosts, setUserPosts] = useState<typeof mockPosts>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('userPosts');
    if (savedPosts) {
      setUserPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    if (userPosts.length > 0) {
      localStorage.setItem('userPosts', JSON.stringify(userPosts));
    }
  }, [userPosts]);

  useEffect(() => {
    const loadData = async () => {
      const savedPosts = localStorage.getItem('userPosts');
      const savedUserPosts = savedPosts ? JSON.parse(savedPosts) : [];

      setIsLoading(true);
      const initialPosts = await fetchPosts(1, 10);
      setPosts([...savedUserPosts, ...initialPosts]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isLoading, hasMore, page]);

  const loadMorePosts = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newPosts = await fetchPosts(nextPage, 10);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
    }

    setIsLoading(false);
  };

  const addNewPost = (content: string, image: string | null) => {
    const newPost = {
      id: Date.now(),
      author: {
        name: currentUser.name,
        username: currentUser.username,
        profileImage: currentUser.profileImage,
        verified: currentUser.verified,
      },
      content,
      images: image ? [image] : [],
      createdAt: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      isLiked: false,
      isRetweeted: false,
    };

    setUserPosts((prev) => [newPost, ...prev]);
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleRetweet = (post: any) => {
    const retweetedPost = {
      ...post,
      id: Date.now(),
      retweetedBy: {
        name: currentUser.name,
        username: currentUser.username,
      },
      createdAt: new Date().toISOString(),
    };

    setUserPosts((prev) => [retweetedPost, ...prev]);
    setPosts((prev) => [retweetedPost, ...prev]);
  };

  return (
    <div className='w-full max-w-2xl border-l border-r border-gray-700'>
      <div className='flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700'>
        <h2 className='text-lg sm:text-xl font-bold'>홈</h2>
      </div>

      <TweetBox currentUser={currentUser} onAddPost={addNewPost} />

      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} onRetweet={handleRetweet} />
        ))}
      </div>

      <div ref={observerTarget} className='py-4 flex justify-center'>
        {isLoading && (
          <div className='flex items-center space-x-2 text-gray-500'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
            <span>로딩 중...</span>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className='text-gray-500 text-sm'>모든 게시물을 불러왔습니다</p>
        )}
      </div>
    </div>
  );
}
