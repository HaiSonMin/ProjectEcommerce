import styled from "styled-components";
import LeftBoardInfo from "./left/LeftBoardInfo";
import RightBoardInfo from "./right";

const InfoMemberStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

export default function InfoMember() {
  return (
    <InfoMemberStyled>
      <LeftBoardInfo />
      <RightBoardInfo />
    </InfoMemberStyled>
  );
}
