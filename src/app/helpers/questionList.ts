import { IQuestion } from "../models/question";

export const questionList: IQuestion[] = [
  {
    id: 1,
    questionText: 'What is your Estimate skill level ?',
    options: [
      { text: 'Beginner' },
      { text: 'Experience' },
      { text: 'Professional' },
    ],
  },
  {
    id: 2,
    questionText: 'Lorem ipsum dolor sit amet consectetur adipisicing. ?',
    options: [
      { text: 'consectetur elit' },
      { text: 'adipiscing' },
      { text: 'elit' },
    ]
  },
  {
    id: 3,
    questionText: 'Lorem ipsum dolor sit amet consectetur adipisicing. ?',
    options: [
      { text: 'elit consectetur' },
      { text: 'elit' },
      { text: 'adipiscing' },
    ]
  },
  {
    id: 4,
    questionText: 'Lorem ipsum dolor sit amet consectetur adipisicing. ?',
    options: [
      { text: 'elit' },
      { text: 'consectetur elit' },
      { text: 'adipiscing' },
    ]
  },
]
