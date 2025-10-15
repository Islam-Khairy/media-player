'use client';

import { Material, VideoPlayerProps } from '@/types/video';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import FloatingLinks from './FloatingLinks';
import { comments, materials } from '@/data/videos';
import Image from 'next/image';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { toast } from 'sonner';

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  return (
    <>
      <div className='relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-xl'>
        <ReactPlayer
          src={video.url}
          playing={playing}
          controls
          width='100%'
          height='100%'
          className='absolute top-0 left-0'
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      </div>
      <div className='mt-4 mb-12'>
        <FloatingLinks />
      </div>

      <div>
        <h2 className='text-3xl font-medium mb-6'>Course Materials</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-md'>
          <div className='flex flex-col gap-3 max-w-sm'>
            {materials.slice(0, 4).map((material: Material, index) => (
              <div
                key={index}
                className='flex items-center justify-between'
              >
                <div className='flex items-center gap-2'>
                  <material.icon size={20} />
                  <p className='text-lg font-medium'>{material.label}</p>
                </div>
                <div>
                  <p className='text-gray-600 font-medium'>{material.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-3 max-w-sm'>
            {materials.slice(4, 8).map((material: any, index) => (
              <div
                key={index}
                className='flex items-center justify-between'
              >
                <div className='flex items-center gap-2'>
                  <material.icon size={20} />
                  <p className='text-lg font-medium'>{material.label}</p>
                </div>
                <div>
                  <p className='text-gray-600 font-medium'>{material.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className='mt-16 -order-1'
        id='comments'
      >
        <h2 className='text-3xl font-medium mb-6'>Comments</h2>
        <div className='flex flex-col gap-10'>
          {comments.map((comment, index) => (
            <div
              key={index}
              className='flex items-start gap-4'
            >
              <Image
                src={comment.authorImage}
                alt={`${comment.authorName} commnent`}
                className='w-16 h-16 rounded-full'
                width={48}
                height={48}
              />
              <div className='flex flex-col gap-1'>
                <h1>{comment.authorName}</h1>
                <span className='text-sm text-gray-500'>{comment.date}</span>
                <p className='text-gray-500'>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='w-full flex flex-col items-start mb-12'>
          <textarea
            name='shipmentNotes'
            placeholder='Write a comment'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className='w-full h-56 mt-12 p-4 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none placeholder:text-lg placeholder:text-gray-400'
          ></textarea>
          <button
          disabled={!commentText}
            type='button'
            onClick={() => {
              toast.success('Comment added successfully!');
              setCommentText('');
            }}
            className='mt-6 px-8 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition text-lg flex items-center gap-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            <span>Submit Review</span>
            <FaLongArrowAltRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
