'use client';

import { CourseData, Video } from '@/types/video';
import LinearProgressBar from './LinearProgressBar';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdLockOutline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { HiX } from 'react-icons/hi';
import { LuAlarmClock } from 'react-icons/lu';

interface VideoListProps {
  items: CourseData[];
  onVideoSelect: (video: Video) => void;
}

const VideoList = ({ items, onVideoSelect }: VideoListProps) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (isQuizModalOpen && selectedVideo?.quizDuration) {
      setTimeLeft(selectedVideo.quizDuration);
    }
  }, [isQuizModalOpen, selectedVideo]);

  useEffect(() => {
    if (!isQuizModalOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizModalOpen, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVideoClick = (video: Video) => {
    if (video.hasQuiz && video.questions) {
      setSelectedVideo(video);
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
      setIsQuizModalOpen(true);
    } else {
      onVideoSelect(video);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedVideo?.questions && currentQuestionIndex < selectedVideo.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

   const handleQuizComplete = () => {
    setIsQuizModalOpen(false);
    if (selectedVideo) {
      onVideoSelect(selectedVideo);
    }
  };

  const currentQuestion = selectedVideo?.questions?.[currentQuestionIndex];

  return (
    <div>
      <h1 className='text-3xl font-medium text-gray-800 mb-8'>Topics for This Course</h1>
      <LinearProgressBar progress={63} />

      <Modal
        open={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        className='flex items-center justify-center p-4 !font-leagueSpartan '
      >
        <div className='relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto !outline-none'>
          <button
            type='button'
            onClick={() => setIsQuizModalOpen(false)}
            className='absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-300'
          >
            <HiX
              size={20}
              className='text-gray-600'
            />
          </button>

          <div className='p-6'>
            <div className='text-center mb-6'>
              <div className='w-fit px-8 py-2 rounded-md bg-gradient-to-br from-yellow-400 to-orange-500  flex items-center justify-center mx-auto mb-4 relative'>
                <div className='flex items-center gap-2 text-white font-semibold text-lg'>
                  <LuAlarmClock
                    size={22}
                    className='-mt-1'
                  />
                  <span> {formatTime(timeLeft)}</span>
                </div>
              </div>

              <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                {selectedVideo?.title} - Quiz
              </h3>
              <p className='text-gray-600 text-lg'>
                Question {currentQuestionIndex + 1} of {selectedVideo?.questions?.length}
              </p>

              {timeLeft < 60 && timeLeft > 0 && (
                <div className='mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium inline-flex items-center gap-1'>
                  ⏰ Hurry! {timeLeft} seconds left
                </div>
              )}
            </div>

            {currentQuestion && (
              <div className='mb-6'>
                <h4 className='text-lg font-semibold text-gray-800 mb-4'>
                  {currentQuestion.question}
                </h4>

                <div className='space-y-3'>
                  {currentQuestion.type === 'select-choice' &&
                    currentQuestion.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? 'border-[#006E61] bg-[#006E61] text-white bg-opacity-10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}

                  {currentQuestion.type === 'true-false' && (
                    <div className='grid grid-cols-2 gap-3'>
                      <button
                        onClick={() => handleAnswerSelect(1)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          selectedAnswers[currentQuestionIndex] === 1
                            ? 'border-[#006E61] bg-[#006E61] text-white shadow-md'
                            : 'border-gray-200 text-gray-700 hover:border-[#006E61]'
                        }`}
                      >
                        True
                      </button>
                      <button
                        onClick={() => handleAnswerSelect(0)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          selectedAnswers[currentQuestionIndex] === 0
                            ? 'border-[#006E61] bg-[#006E61] text-white shadow-md'
                            : 'border-gray-200 text-gray-700 hover:border-[#006E61]'
                        }`}
                      >
                        False
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className='flex gap-3'>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg transition-colors truncate ${
                  currentQuestionIndex === 0
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous Question
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className='w-full px-4 py-2 bg-[#006E61] text-white rounded-lg hover:bg-[#005a4f] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
              >
                {currentQuestionIndex === (selectedVideo?.questions?.length || 1) - 1
                  ? 'Complete Quiz'
                  : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className='mt-8 flex flex-col gap-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className='border border-gray-300 rounded-lg p-4 bg-[#fefefe] shadow-sm'
          >
            <h1 className='text-lg font-semibold'>{item.title}</h1>
            <p className='my-3 text-gray-600'>{item.subtitle}</p>
            <div className='flex flex-col gap-2'>
              {item.videos.map((video) => (
                <div
                  key={video.id}
                  className='flex items-center justify-between gap-2 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-gray-300 p-4'
                  onClick={() => handleVideoClick(video)}
                >
                  <div className='flex items-center gap-2 w-full truncate'>
                    <IoDocumentTextOutline />
                    <h3 className='text-lg text-gray-800 truncate'>{video.title}</h3>

                    {video.hasQuiz && (
                      <div className='flex items-center gap-2 truncate'>
                        <span className='px-1.5 py-0.5 bg-green-100/50 rounded-md text-green-700'>{video.questions?.length} Questions</span>
                        <span className='px-1.5 py-0.5 bg-red-100/50 rounded-md text-red-500'>
                          {video.quizDuration && video.quizDuration / 60} minutes
                        </span>
                      </div>
                    )}
                  </div>

                  <MdLockOutline size={20} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
