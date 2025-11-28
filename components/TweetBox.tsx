'use client';

import { useState } from 'react';

interface TweetBoxProps {
  currentUser: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
    verified: boolean;
  };
  onAddPost: (content: string, image: string | null) => void;
}

export default function TweetBox({ currentUser, onAddPost }: TweetBoxProps) {
  const MAX_CHARS = 280;
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setInput(text);
    }
  };

  const remainingChars = MAX_CHARS - input.length;
  const isOverLimit = input.length > MAX_CHARS;
  const isNearLimit = remainingChars <= 20 && remainingChars > 0;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const sendTweet = () => {
    if (!input.trim() && !selectedImage) return;

    onAddPost(input, selectedImage);

    setInput('');
    setSelectedImage(null);
  };

  return (
    <div className='border-b border-gray-700 p-3 flex space-x-3'>
      <img
        src={currentUser.profileImage}
        alt={currentUser.name}
        className='w-11 h-11 rounded-full flex-shrink-0'
      />

      <div className='flex-grow'>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='무슨 일이 일어나고 있나요?'
          className='bg-transparent outline-none text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] resize-none'
          maxLength={MAX_CHARS}
        />

        {selectedImage && (
          <div className='relative mt-2'>
            <img
              src={selectedImage}
              alt='Selected'
              className='rounded-2xl max-h-80 w-full object-cover'
            />
            <button
              onClick={removeImage}
              className='absolute top-2 right-2 bg-gray-900 bg-opacity-75 hover:bg-opacity-90 rounded-full p-2 text-white'
            >
              ✕
            </button>
          </div>
        )}

        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex items-center space-x-3'>
            <label className='text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 rounded-full p-2 cursor-pointer transition-colors'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageSelect}
                className='hidden'
              />
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v14h14V5H5zm2 2h10v8H7V7zm2 2v4h6V9H9zm-2 6h10v2H7v-2z' />
                <circle cx='8.5' cy='8.5' r='1.5' />
              </svg>
            </label>

            {input.length > 0 && (
              <div className='flex items-center space-x-2'>
                <span
                  className={`text-sm font-medium ${
                    isOverLimit
                      ? 'text-red-500'
                      : isNearLimit
                      ? 'text-yellow-500'
                      : 'text-gray-500'
                  }`}
                >
                  {remainingChars}
                </span>
                <svg className='w-5 h-5 -rotate-90' viewBox='0 0 20 20'>
                  <circle
                    cx='10'
                    cy='10'
                    r='8'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-gray-700'
                  />
                  <circle
                    cx='10'
                    cy='10'
                    r='8'
                    fill='none'
                    strokeWidth='2'
                    strokeLinecap='round'
                    className={`${
                      isOverLimit
                        ? 'stroke-red-500'
                        : isNearLimit
                        ? 'stroke-yellow-500'
                        : 'stroke-blue-500'
                    }`}
                    strokeDasharray={`${
                      (input.length / MAX_CHARS) * 50.27
                    } 50.27`}
                  />
                </svg>
              </div>
            )}
          </div>

          <button
            onClick={sendTweet}
            disabled={(!input.trim() && !selectedImage) || isOverLimit}
            className='bg-blue-500 text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            트윗하기
          </button>
        </div>
      </div>
    </div>
  );
}
