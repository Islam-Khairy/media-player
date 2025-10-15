'use client';

import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import type { Video } from '@/types/video';
import VideoList from './components/VideoList';
import CustomBreadcrumbs from './components/Breadcrumb';
import { courseData } from '@/data/videos';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video>(courseData[0].videos[0]);

  return (
    <div className='min-h-screen px-4 md:px-12 py-8 font-leagueSpartan'>
      <CustomBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Courses', href: '/' },
          { label: 'Course Details' },
        ]}
        separator='›'
        className='mt-2 mb-8'
      />
      <h1 className='text-4xl font-semibold my-6'>Starting SEO as your Home</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {' '}
        <div className='col-span-1 md:col-span-2'>
          <VideoPlayer video={selectedVideo} />
        </div>
        <div className='col-span-1'>
          <VideoList
            items={courseData}
            onVideoSelect={(video) => setSelectedVideo(video)}
          />
        </div>
      </div>
    </div>
  );
}
