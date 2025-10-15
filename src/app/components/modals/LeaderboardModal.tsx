'use client';

import Modal from '@mui/material/Modal';
import { HiX } from 'react-icons/hi';

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
}

const leaderboardData = [
  { rank: 1, name: 'Islam Khairy', score: 95, progress: 'Top 1%' },
  { rank: 2, name: 'Mona Ali', score: 92, progress: 'Top 2%' },
  { rank: 3, name: 'Mohamed Omar', score: 88, progress: 'Top 5%' },
];

const LeaderboardModal = ({ open, onClose }: LeaderboardModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='leaderboard-modal'
      className='flex items-center justify-center p-4'
    >
      <div className='relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-300'
          aria-label='Close'
        >
          <HiX
            size={20}
            className='text-gray-600'
          />
        </button>

        <div className='p-8'>
          <div className='text-center mb-8 !font-leagueSpartan'>
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>Course Name</h1>
            <h2 className='text-xl font-semibold'>Leaderboard</h2>
          </div>

          <div className='bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8 text-center border border-blue-100'>
            <div className='text-4xl mb-2'>💪</div>
            <h3 className='text-lg font-bold text-gray-800 mb-3'>Excellent Job</h3>
            <p className='text-gray-700 leading-relaxed'>Very well done buddy</p>
          </div>

          <div className='flex flex-col gap-3 !font-leagueSpartan'>
            {leaderboardData.map((student) => (
              <div
                key={student.rank}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all bg-gray-50 border-gray-200`}
              >
                <div className='flex items-center gap-4'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      student.rank === 1
                        ? 'bg-yellow-100 text-yellow-800'
                        : student.rank === 2
                        ? 'bg-gray-200 text-gray-800'
                        : student.rank === 3
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {student.rank}
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg'>{student.name}</h4>
                    <p className='text-gray-600'>{student.progress}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-lg font-bold text-[#006E61]'>{student.score}%</div>
                  <div className='text-sm text-gray-500'>Score</div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 text-center text-gray-600'>
            <p>the better yet to come 🚀</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LeaderboardModal;
