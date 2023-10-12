import styled from "styled-components";
import RankTop from "./top";
import RankBottom from "./bottom";

const MemberRankLayoutStyled = styled.div`
  margin: 0 auto;
  width: 70rem;
  padding: 1rem;
`;

export default function MemberRankLayout() {
  return (
    <MemberRankLayoutStyled>
      <RankTop />
      <RankBottom />
    </MemberRankLayoutStyled>
  );
}
