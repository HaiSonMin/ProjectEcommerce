import { FaRegEye } from "react-icons/fa";
import { styled } from "styled-components";
import AnswerQuestionItem from "./AnswerQuestionItem";

const AnswerQuestionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SeeMoreQuestion = styled.div`
  min-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 8px 0;
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  cursor: pointer;
  background-color: #fff;

  & svg {
    transition: all 0.3s;
  }

  &:hover {
    color: var(--color-primary);
    outline: 1px solid var(--color-primary);
    background-color: var(--color-red-100);

    & svg {
      scale: 1.15;
    }
  }
`;
const questionsTest = [
  { _id: "123123123", name: "Son" },
  { _id: "123123122", name: "Trung" },
  { _id: "123123134", name: "Nguyen" },
];
export default function AnswerQuestion() {
  return (
    <AnswerQuestionStyled>
      {questionsTest.map((rated) => (
        <AnswerQuestionItem
          key={rated._id}
          timeline={"2023-07-26T09:11:32.436+00:00"}
        />
      ))}
      <SeeMoreQuestion>
        <span>Xem thêm {12} câu hỏi về sản phẩm</span>
        <FaRegEye />
      </SeeMoreQuestion>
    </AnswerQuestionStyled>
  );
}
