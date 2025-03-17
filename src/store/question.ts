import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (lang: string) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0, //posicion del array de questions

        fetchQuestions: async (lang: string) => {
          const res = await fetch(`http://localhost:5173/data${lang}.json`);
          const json: Question[] = await res.json();
          const questions = json.sort(() => Math.random() - 0.5).slice(0, 10);
          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          //usar el structuredClone para clonar el objeto
          const newQuestions = structuredClone(questions);
          //Encontramos el indice de la pregunta
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          //Obtenemos la informacion de la pregunta
          const questionInfo = newQuestions[questionIndex];
          //Averiguamos si el usuario ha seleccionado la respuesta correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          //cambiar esta infromacion en la copia de la pregunta
          if (isCorrectUserAnswer) confetti();
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          // actualizamos el estado
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;
          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },
        reset: () => {
          set({ currentQuestion: 0 });
        },
      };
    },
    {
      name: "questions",
    }
  )
);
