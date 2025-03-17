import { Button } from "@mui/material";
import useQuestionData from "./hooks/useQuestionData";
import { useQuestionsStore } from "./store/question";

interface Props {
  lang: string;
}

const Footer = ({ lang }: Props) => {
  const { correct, incorrect, unanswered } = useQuestionData();
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`Correctos ${correct} - Incorrectos ${incorrect} - Sin respuesta ${unanswered}`}</strong>

      <Button
        variant="contained"
        sx={{ marginLeft: "20px" }}
        onClick={() => {
          fetchQuestions(lang);
          reset();
        }}
      >
        Reiniciar Quizz
      </Button>
    </footer>
  );
};

export default Footer;
