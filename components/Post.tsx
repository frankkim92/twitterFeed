'use client';

import { useState } from 'react';

interface PostProps {
  post: {
    id: number;
    author: {
      name: string;
      username: string;
      profileImage: string;
      verified: boolean;
    };
    content: string;
    images: string[];
    createdAt: string;
    likes: number;
    retweets: number;
    isLiked: boolean;
    isRetweeted: boolean;
    retweetedBy?: {
      name: string;
      username: string;
    };
  };
  onRetweet?: (post: PostProps['post']) => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;

  return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
}

export default function Post({ post, onRetweet }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isRetweeted, setIsRetweeted] = useState(post.isRetweeted);
  const [retweetsCount, setRetweetsCount] = useState(post.retweets);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isRetweeted) {
      setRetweetsCount((prev) => prev + 1);
      setIsRetweeted(true);

      if (onRetweet) {
        onRetweet(post);
      }
    } else {
      setRetweetsCount((prev) => prev - 1);
      setIsRetweeted(false);
    }
  };
  return (
    <div className='border-b border-gray-700 hover:bg-gray-900 transition-colors'>
      {post.retweetedBy && (
        <div className='flex items-center px-3 pt-3 pb-1 text-gray-500 text-sm'>
          <span className='ml-9 mr-2'>🔁</span>
          <span className='font-semibold hover:underline cursor-pointer'>
            {post.retweetedBy.name}
          </span>
          <span className='ml-1'>님이 리트윗했습니다</span>
        </div>
      )}

      <div className='p-3 flex cursor-pointer'>
        <img
          src={post.author.profileImage}
          alt={post.author.name}
          className='w-11 h-11 rounded-full flex-shrink-0 mr-3'
        />
        <div className='flex-grow'>
          <div className='flex items-center space-x-1'>
            <h4 className='font-bold text-[15px] hover:underline'>
              {post.author.name}
            </h4>
            {post.author.verified && <span className='text-blue-500'>✓</span>}
            <span className='text-gray-500 text-sm'>
              @{post.author.username}
            </span>
            <span className='text-gray-500 text-sm'>·</span>
            <span className='text-gray-500 text-sm hover:underline'>
              {formatDate(post.createdAt)}
            </span>
          </div>

          <p className='text-[15px] mt-0.5'>{post.content}</p>

          {post.images.length > 0 && (
            <div className='mt-2 rounded-2xl overflow-hidden'>
              <img
                src={post.images[0]}
                alt=''
                className='w-full max-h-[500px] object-cover'
              />
            </div>
          )}

          <div className='flex gap-12 text-gray-500 mt-3'>
            <div
              className='flex items-center space-x-1 group cursor-pointer'
              onClick={handleRetweet}
            >
              <div
                className={`icon group-hover:bg-green-500 group-hover:bg-opacity-10 ${
                  isRetweeted ? 'text-green-500' : ''
                }`}
              >
                🔁
              </div>
              <span
                className={`group-hover:text-green-500 text-sm ${
                  isRetweeted ? 'text-green-500' : ''
                }`}
              >
                {retweetsCount}
              </span>
            </div>

            <div
              className='flex items-center space-x-1 group cursor-pointer'
              onClick={handleLike}
            >
              <div
                className={`icon group-hover:bg-pink-500 group-hover:bg-opacity-10 ${
                  isLiked ? 'text-pink-500' : ''
                }`}
              >
                {isLiked ? '❤️' : '🤍'}
              </div>
              <span
                className={`group-hover:text-pink-500 text-sm ${
                  isLiked ? 'text-pink-500' : ''
                }`}
              >
                {likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
