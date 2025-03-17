import { IconButton, Stack } from "@mui/material";
import { useQuestionsStore } from "./store/question";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Question from "./Components/Question/Question";

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );
  const questionInfo = questions[currentQuestion];

  console.log(questions);

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "30px" }}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>

      <Question info={questionInfo} />
    </>
  );
};

export default Game;
