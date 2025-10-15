import { Comment, CourseData, Material } from '@/types/video';
import { MdAccessTime } from 'react-icons/md';
import { GrLanguage } from 'react-icons/gr';
import { GiRead } from 'react-icons/gi';
import { CiGrid42 } from 'react-icons/ci';
import { AiOutlineUser } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

export const courseData: CourseData[] = [
  {
    id: 'week-1-4',
    title: 'Week 1-4',
    subtitle: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
    videos: [
      {
        id: 1,
        title: 'Introduction',
        url: 'https://www.youtube.com/watch?v=CiaMTs7dI4E&list=RDCiaMTs7dI4E&start_radio=1',
        duration: 360,
      },
      {
        id: 2,
        title: 'Course Overview',
        url: 'https://www.youtube.com/watch?v=VmZ8pKZUVfY&list=RDVmZ8pKZUVfY&start_radio=1',
        duration: 600,
        hasQuiz: true,
        quizQuestions: 3,
        quizDuration: 600,
        questions: [
          {
            id: 1,
            question: 'What is the capital of Spain?',
            type: 'select-choice',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 4,
          },
          {
            id: 2,
            question: 'Fayoum is an Egyptian city located in the Faiyum Oasis.',
            type: 'true-false',
            correctAnswer: 1,
          },
          {
            id: 1,
            question: 'What is the capital of Germany?',
            type: 'select-choice',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 3,
        title: 'Course Exercise / Reference Files',
        url: 'https://www.youtube.com/watch?v=VqhCQZaH4Vs&list=RDVqhCQZaH4Vs&start_radio=1',
        duration: 360,
      },
      {
        id: 4,
        title: 'Code Editor Installation (Optional if you have one)',
        url: 'https://www.youtube.com/watch?v=ptIXwyxf7XQ&list=RDptIXwyxf7XQ&start_radio=1',
        duration: 360,
      },
      {
        id: 5,
        title: 'Embedding PHP in HTML',
        url: 'https://www.youtube.com/watch?v=0aUav1lx3rA&list=RD0aUav1lx3rA&start_radio=1',
        duration: 360,
      },
    ],
  },
  {
    id: 'week-5-8',
    title: 'Week 5-8',
    subtitle: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
    videos: [
      {
        id: 6,
        title: 'Defining Functions',
        url: 'https://www.youtube.com/watch?v=1__CAdTJ5JU&list=RD1__CAdTJ5JU&start_radio=1',
        duration: 360,
      },
      {
        id: 7,
        title: 'Function Parameters',
        url: 'https://www.youtube.com/watch?v=W2MpGCL8-9o&list=RDW2MpGCL8-9o&start_radio=1',
        duration: 360,
      },
      {
        id: 8,
        title: 'Return Values From Functions',
        url: 'https://www.youtube.com/watch?v=p79GmLNLMrY&list=RDp79GmLNLMrY&start_radio=1',
        duration: 900,
        hasQuiz: true,
        quizQuestions: 3,
        quizDuration: 600,
        questions: [
          {
            id: 1,
            question: 'What is the capital of Spain?',
            type: 'select-choice',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 4,
          },
          {
            id: 2,
            question: 'Fayoum is an Egyptian city located in the Faiyum Oasis.',
            type: 'true-false',
            correctAnswer: 1,
          },
          {
            id: 1,
            question: 'What is the capital of Germany?',
            type: 'select-choice',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 9,
        title: 'Global Variable and Scope',
        url: 'https://www.youtube.com/watch?v=czWcyZRAMtk&list=RDczWcyZRAMtk&start_radio=1',
        duration: 360,
      },
      {
        id: 10,
        title: 'Newer Way of creating a Constant',
        url: 'https://www.youtube.com/watch?v=p3pEe6aAJ4k&list=RDp3pEe6aAJ4k&start_radio=1',
        duration: 360,
      },
    ],
  },
];

export const materials: Material[] = [
  {
    icon: MdAccessTime,
    label: 'Duration',
    value: '3 weeks',
  },
  {
    icon: CiGrid42,
    label: 'Lessons',
    value: '8',
  },
  {
    icon: GiRead,
    label: 'Enrolled',
    value: '65 students',
  },
  {
    icon: GrLanguage,
    label: 'Language',
    value: 'English',
  },
   {
    icon: AiOutlineUser,
    label: 'Instructor',
    value: 'Islam Khairy',
  },
   {
    icon: PiCertificate,
    label: 'Certificate',
    value: 'Yes',
  },
   {
    icon: LiaMoneyBillWaveSolid,
    label: 'Price',
    value: '$ 49.99',
  },
   {
    icon: IoExtensionPuzzleOutline,
    label: 'Quizzes',
    value: 'Yes',
  },
];

export const comments: Comment[] = [
  {
    authorName: 'Ahmed Khairy',
    authorImage: '/images/comments/1.webp',
    date: 'Oct 10, 2021',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    authorName: 'Mona Ali',
    authorImage: '/images/comments/2.webp',
    date: 'Oct 15, 2021',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    authorName: 'Mohamed Omar',
    authorImage: '/images/comments/3.webp',
    date: 'Oct 19, 2021',
    content:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
