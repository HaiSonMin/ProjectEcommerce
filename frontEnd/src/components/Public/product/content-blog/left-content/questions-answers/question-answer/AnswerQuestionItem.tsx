import { styled } from "styled-components";
import Question from "./user";

const AnswerQuestionItemStyled = styled.div``;

export default function AnswerQuestionItem({ timeline }) {
  return (
    <AnswerQuestionItemStyled>
      <Question />
    </AnswerQuestionItemStyled>
  );
}
