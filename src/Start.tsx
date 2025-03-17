import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LanguageButton from "./Components/LanguageButton/LanguageButton";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { langType } from "./types";

interface Props {
  setLang: Dispatch<SetStateAction<string | null>>;
}

const arrayLanguages: langType[] = [
  {
    id: 1,
    language: "Ts",
    text: "Typescript",
  },
  {
    id: 2,
    language: "Js",
    text: "Javascript",
  },
  {
    id: 3,
    language: "Py",
    text: "Python",
  },
];

const langString = localStorage.getItem("quizzez");
const initialData = langString ? JSON.parse(langString) : arrayLanguages;

const Start = ({ setLang }: Props) => {
  const [quizzez, setQuizzez] = useState<langType[]>(initialData);

  useEffect(() => {
    localStorage.setItem("quizzez", JSON.stringify(quizzez));
  }, [quizzez]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setQuizzez((quizz) => {
      const oldIndex = quizz.findIndex((q) => q.id === active.id);
      const newIndex = quizz.findIndex((q) => q.id === over?.id);
      return arrayMove(quizz, oldIndex, newIndex);
    });
  };

  return (
    <div className="select-languages">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={quizzez} strategy={verticalListSortingStrategy}>
          {quizzez.map((quizz) => (
            <LanguageButton key={quizz.id} langQuiz={quizz} setLang={setLang} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Start;
