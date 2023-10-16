import styled from "styled-components";
import AboutMember from "./layout-components/about-member";
import TipMember from "./layout-components/tip-member";
import InfoMember from "./layout-components/info-member";

const MemberHomeLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function MemberHomeLayout() {
  return (
    <MemberHomeLayoutStyled>
      <InfoMember />
      <TipMember />
      <AboutMember />
    </MemberHomeLayoutStyled>
  );
}
