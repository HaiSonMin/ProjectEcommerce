import { styled } from "styled-components";
import LaptopHeaderLayout from "./LaptopHeader";
import LaptopContainerCard from "./LaptopContainerCard";

const LaptopLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export default function LaptopLayout() {
  return (
    <LaptopLayoutStyled>
      <LaptopHeaderLayout />
      <LaptopContainerCard />
    </LaptopLayoutStyled>
  );
}
