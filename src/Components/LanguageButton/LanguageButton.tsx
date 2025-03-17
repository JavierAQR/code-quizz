import { Button } from "@mui/material";
import { useQuestionsStore } from "../../store/question";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Style.css";
import { langType } from "../../types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  langQuiz: langType;
  setLang: Dispatch<SetStateAction<string | null>>;
}

const LanguageButton = ({ langQuiz, setLang }: Props) => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({
      id: langQuiz.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Button
      variant="text"
      sx={{ gap: 2, width: 260, bgcolor: "#202020" }}
      onClick={() => {
        fetchQuestions(langQuiz.language);
        setLang(langQuiz.text);
      }}
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <img
        src={`icons/${langQuiz.language}.svg`}
        style={{ height: 40, width: 40 }}
        {...listeners}
      />
      {langQuiz.text}
    </Button>
  );
};

export default LanguageButton;
