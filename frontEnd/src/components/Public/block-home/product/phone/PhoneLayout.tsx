import { styled } from "styled-components";
import PhoneHeaderLayout from "./PhoneHeader";
import PhoneContainerCard from "./PhoneContainerCard";

const PhoneLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export default function PhoneLayout() {
  return (
    <PhoneLayoutStyled>
      <PhoneHeaderLayout />
      <PhoneContainerCard />
    </PhoneLayoutStyled>
  );
}
