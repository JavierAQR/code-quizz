export interface Question {
  id: number;
  question: string;
  lang: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}

export interface langType {
  id: number;
  language: string;
  text: string;
}
