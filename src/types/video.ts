import { IconType } from 'react-icons';

export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  videos: Video[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'select-choice' | 'true-false';
  options?: string[];
  correctAnswer: number;
}

export interface Video {
  id: number;
  title: string;
  url: string;
  description?: string;
  duration?: number;
  hasQuiz?: boolean;
  quizQuestions?: number;
  quizDuration?: number;
  questions?: QuizQuestion[];
}

export interface VideoPlayerProps {
  video: Video;
}

export interface Material {
  icon: IconType;
  label: string;
  value: string;
}

export interface Comment {
  authorName: string;
  authorImage: string;
  date: string;
  content: string;
}
