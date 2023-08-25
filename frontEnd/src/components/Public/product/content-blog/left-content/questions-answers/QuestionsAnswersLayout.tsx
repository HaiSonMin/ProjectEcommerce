import { Heading } from "@/components";
import { styled } from "styled-components";
import { TbSend } from "react-icons/tb";

const QuestionsAnswersLayoutStyled = styled.div`
  padding: 2rem 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-around);
  width: 70%;
`;

const QuestionFrom = styled.form`
  display: flex;
`;

const QuestionBox = styled.div`
  position: relative;
`;

const BtnSendQuestion = styled.button``;

export default function QuestionsAnswers() {
  return (
    <QuestionsAnswersLayoutStyled>
      <Heading $as="h3">Hỏi và đáp</Heading>
      <QuestionFrom>
        <QuestionBox>
          <img />
          <textarea />
        </QuestionBox>
        <BtnSendQuestion>
          <TbSend /> Gửi
        </BtnSendQuestion>
      </QuestionFrom>
    </QuestionsAnswersLayoutStyled>
  );
}
