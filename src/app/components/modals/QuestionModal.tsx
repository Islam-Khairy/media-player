'use client';

import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { HiX } from 'react-icons/hi';
import { FaRegQuestionCircle } from 'react-icons/fa';

interface QuestionModalProps {
  open: boolean;
  handleModalClose: (value: boolean) => void;
}

const Question = 'course-question';

const QuestionModal = ({ open, handleModalClose }: QuestionModalProps) => {
  const [questionText, setQuestionText] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedQuestion = sessionStorage.getItem(Question);
      if (savedQuestion) {
        setQuestionText(savedQuestion);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (questionText.trim()) {
        sessionStorage.setItem(Question, questionText);
      } else {
        sessionStorage.removeItem(Question);
      }
    }
  }, [questionText]);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(Question);
    }
    setQuestionText('');
    handleModalClose(false);
  };

  const handleClose = () => {
    handleModalClose(false);
  };

  const handleClearDraft = () => {
    setQuestionText('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(Question);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='question-modal'
      className='flex items-center justify-center p-4'
    >
      <div className='relative bg-white rounded-2xl overflow-hidden max-w-lg w-full !font-leagueSpartan'>
        <button
          type='button'
          onClick={handleClose}
          className='absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-300'
          aria-label='Close'
        >
          <HiX
            size={20}
            className='text-gray-600'
          />
        </button>

        <form onSubmit={handleSubmitQuestion}>
          <div className='p-6'>
            <div className='text-center mb-6'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaRegQuestionCircle className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800'>Have a Question?</h3>
            </div>

            <div className='flex flex-col gap-4'>
              <div>
                <div className='flex justify-between items-center mb-2'>
                  <label
                    htmlFor='question'
                    className='text-lg font-medium text-gray-700'
                  >
                    Your Question:
                  </label>
                  {questionText && (
                    <button
                      type='button'
                      onClick={handleClearDraft}
                      className='cursor-pointer border border-gray-300 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 text-sm'
                    >
                      Clear
                    </button>
                  )}
                </div>
                <textarea
                  id='question'
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder='Type your question?'
                  className='w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-colors placeholder:text-lg text-xl'
                  required
                />
              </div>
            </div>

            <div className='mt-6 flex gap-3 text-lg'>
              <button
                type='button'
                onClick={handleClose}
                className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={!questionText.trim()}
                className='flex-1 px-4 py-2 bg-[#006E61] text-white rounded-lg hover:bg-[#005a4f] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer truncate'
              >
                Submit Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default QuestionModal;
