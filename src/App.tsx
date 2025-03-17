import { Button, Container, Stack, Typography } from "@mui/material";
import "./App.css";
import Start from "./Start";
import Game from "./Game";
import { useState } from "react";
import Footer from "./Footer";
import { useQuestionsStore } from "./store/question";

function App() {
  const [lang, setLang] = useState<string | null>(null);
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <main>
      <Container maxWidth="md">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          {lang && (
            <Button
              variant="outlined"
              sx={{ alignSelf: "flex-end" }}
              onClick={() => {
                setLang(null);
                reset();
              }}
            >
              Regresar
            </Button>
          )}

          <header style={{ textAlign: "center" }}>
            <Typography variant="h2" component="h1">
              {(!lang ? "Code" : lang) + " Quizz"}
            </Typography>
            {!lang && (
              <Typography
                variant="h6"
                component={"h1"}
                sx={{ color: "gray", marginBottom: "70px" }}
              >
                Ordenalos como quieras
              </Typography>
            )}
          </header>
          {!lang && <Start setLang={setLang} />}
          {lang && (
            <>
              <Game />
              <Footer lang={lang} />
            </>
          )}
        </Stack>
      </Container>
    </main>
  );
}

export default App;
