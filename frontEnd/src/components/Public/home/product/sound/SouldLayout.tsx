import { styled } from "styled-components";
import SoundHeaderLayout from "./SouldHeader";
import SoundContainerCard from "./SouldContainerCard";

const SoundLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export default function SoundLayout() {
  return (
    <SoundLayoutStyled>
      <SoundHeaderLayout />
      <SoundContainerCard />
    </SoundLayoutStyled>
  );
}
