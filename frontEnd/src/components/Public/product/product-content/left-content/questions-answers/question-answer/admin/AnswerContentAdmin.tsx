import { styled } from "styled-components";

const AnswerContentAdminStyled = styled.div`
  margin-left: 3rem;
`;
const Comment = styled.div`
  margin-top: 4px;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-200);
  background-color: #fff;
  box-shadow: var(--shadow-around);
  & p {
    font-size: 1.2rem;
  }
`;

export default function AnswerContentAdmin({ comment }) {
  return (
    <AnswerContentAdminStyled>
      <Comment>
        <p>{comment}</p>
      </Comment>
    </AnswerContentAdminStyled>
  );
}
