import { styled } from "styled-components";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import Heading from "@/components/shared/Heading";
import Question from "./question/Question";
import AnswerQuestion from "./question-answer";

const QuestionsAnswersLayoutStyled = styled.div`
  padding: 2rem 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-around);
`;

const TitleQAA = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;

  & svg {
    width: 2.8rem;
    height: 2.4rem;
    margin-bottom: 2px;
    color: var(--color-primary);
  }
`;

export default function QuestionsAnswersLayout() {
  return (
    <QuestionsAnswersLayoutStyled>
      <TitleQAA>
        <MdOutlineQuestionAnswer />
        <Heading $as="h4">Hỏi và đáp</Heading>
      </TitleQAA>
      <Question />
      <AnswerQuestion />
    </QuestionsAnswersLayoutStyled>
  );
}
