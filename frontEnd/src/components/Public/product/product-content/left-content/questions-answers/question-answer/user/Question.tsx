import { FaRegEye } from "react-icons/fa";
import { styled } from "styled-components";
import QuestionTop from "./QuestionTop";
import QuestionContent from "./QuetionContent";

const QuestionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function Question() {
  return (
    <QuestionStyled>
      <QuestionTop
        customerName={"Son"}
        timelineRated={"2023-07-26T09:11:32.436+00:00"}
      />
      <QuestionContent
        comment={
          "Hôm 2/6, mình và mẹ có ghé chi nhanh 347 Nguyễn Tri Phương, Phường 5, Quận 10, Thành phố Hồ Chí Minh để mua 14promax 128gb được 1 chị nhân viên tên Trần Thùy Linh tư vấn rất nhiệt tình và dễ thương. Mẹ mình vốn khó tính và kĩ lưỡng, hỏi khá nhiều nhưng mà chị vẫn vui vẻ trả lời và phục vụ rất nhiệt tình ạ. Mình khá hài lòng với thái độ phục vụ tại Chi nhánh này của CellphoneS"
        }
      />
    </QuestionStyled>
  );
}
