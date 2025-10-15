'use client';

import { FaRegCommentDots, FaRegQuestionCircle } from 'react-icons/fa';
import { LiaMedalSolid } from 'react-icons/lia';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import LeaderboardModal from './modals/LeaderboardModal';
import QuestionModal from './modals/QuestionModal';

const springConfig = {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
};

export const items = [
  {
    title: 'add comment',
    icon: <FaRegCommentDots />,
    href: '#comments',
  },
  {
    title: 'ask a question',
    icon: <FaRegQuestionCircle />,
  },
  {
    title: 'show leader board',
    icon: <LiaMedalSolid />,
  },
];

const FloatingLinks = () => {
  const [isLeaderBoardModalOpen, setIsLeaderBoardModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const mouseX = useMotionValue(-10000);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.pageX);
    },
    [mouseX],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-10000);
  }, [mouseX]);

  const handleItemClick = useCallback((item: (typeof items)[0]) => {
    switch (item.title) {
      case 'show leader board':
        setIsLeaderBoardModalOpen(true);
        break;
      case 'ask a question':
        setIsQuestionModalOpen(true);
        break;
      default:
        break;
    }
  }, []);

  const handleModalClose = (val: boolean) => {
    setIsQuestionModalOpen(val);
  };

  return (
    <div>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className='w-full items-center flex gap-4 rounded-2xl h-16 mx-auto'
      >
        {items?.map((item) => (
          <IconContainer
            mouseX={mouseX}
            key={item.title}
            item={item}
            onItemClick={handleItemClick}
          />
        ))}
      </motion.div>

      <LeaderboardModal
        open={isLeaderBoardModalOpen}
        onClose={() => setIsLeaderBoardModalOpen(false)}
      />

      <QuestionModal
        open={isQuestionModalOpen}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

const IconContainer = ({
  mouseX,
  item,
  onItemClick,
}: {
  mouseX: MotionValue;
  item: (typeof items)[0];
  onItemClick: (item: (typeof items)[0]) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(1000);

  useEffect(() => {
    distance.set(1000);
  }, [distance]);

  useMotionValueEvent(mouseX, 'change', (val: any) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    distance.set(val - bounds.x - bounds.width / 2);
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150, 1000], [40, 80, 40, 40]),
    springConfig,
  );

  const height = useSpring(
    useTransform(distance, [-150, 0, 150, 1000], [40, 80, 40, 40]),
    springConfig,
  );

  const iconSize = useSpring(
    useTransform(distance, [-150, 0, 150, 1000], [20, 40, 20, 20]),
    springConfig,
  );

  const handleClick = (e: React.MouseEvent) => {
    if (!item.href) {
      e.preventDefault();
      e.stopPropagation();
      onItemClick(item);
    }
  };

  return (
    <Link
      href={item.href || '#'}
      onClick={handleClick}
      aria-label={item.title}
      tabIndex={0}
      className={!item.href ? 'cursor-pointer' : ''}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        className='group relative flex aspect-square items-center justify-center rounded-full group bg-gray-300/70 hover:bg-gray-300 transition-colors duration-300'
      >
        <div className='absolute -top-10 left-1/2 w-fit rounded-md px-2 py-1.5 text-xs bg-white/90 opacity-0 transform translate-y-2 -translate-x-1/2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-nowrap'>
          {item.title}
        </div>

        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className='flex items-center justify-center'
        >
          {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
            className:
              'h-full w-full text-gray-600 group-hover:text-gray-900 transition-all duration-200',
          })}
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default FloatingLinks;
