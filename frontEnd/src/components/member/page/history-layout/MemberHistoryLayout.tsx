import HistoryTop from "./top";
import HistoryBottom from "./bottom";
import styled from "styled-components";
const MemberHistoryLayoutStyled = styled.div`
  padding: 2rem 0;
`;

export default function MemberHistoryLayout() {
  return (
    <MemberHistoryLayoutStyled>
      <HistoryTop />
      <HistoryBottom />
    </MemberHistoryLayoutStyled>
  );
}
