import { TbSend } from "react-icons/tb";
import { styled } from "styled-components";

const IMG_ICON =
  "https://cdn2.cellphones.com.vn/55x,webp,q100/media/wysiwyg/chibi2.png";
const QuestionStyled = styled.div`
  margin-bottom: 3rem;
`;

const QuestionFrom = styled.form`
  position: relative;
  display: flex;
  gap: 1rem;
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 6px;
`;

const QuestionBox = styled.textarea`
  display: block;
  flex-grow: 1;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
  min-height: 12rem;
  font-size: 1.4rem;
  padding: 1rem 1rem 1rem 7rem;

  &:focus {
    outline: none;
  }
`;

const BtnSendQuestion = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  align-self: flex-start;
  font-weight: 600;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  color: #fff;
`;

export default function Question() {
  return (
    <QuestionStyled>
      <QuestionFrom>
        <Img src={IMG_ICON} alt="Icon đặt câu hỏi" />
        <QuestionBox placeholder="Xin mời để lại cậu hỏi tại đây, chúng tôi sẽ phản hồi ý kiện của bạn sớm nhất có thể" />
        <BtnSendQuestion>
          <TbSend />
          <span>Gửi</span>
        </BtnSendQuestion>
      </QuestionFrom>
    </QuestionStyled>
  );
}
