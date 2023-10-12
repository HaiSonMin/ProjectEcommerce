import { Link } from "react-router-dom";
import { keyframes, styled } from "styled-components";

const HeaderTopBarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  height: 3rem;
  background: linear-gradient(-170deg, #5f6e9c, #5f819e, #67a8a8, #69bdac);
`;

const pulsing = keyframes`
  0%   {opacity: 1}
  100% {scale: 3; opacity: 0}
 `;

const DotAnimation = styled.div`
  height: 1rem;
  width: 1rem;
  background-color: var(--color-white);
  border-radius: 50%;
  box-shadow: 0 0 0 0 var(--color-white);
  display: block;
  transition: all 0.3s ease-in-out;
  animation: ${pulsing} 1.25s cubic-bezier(0.66, 0, 0, 1) infinite;
`;

const LinkOrder = styled(Link)`
  color: white;
`;

export default function HeaderTopBar() {
  return (
    <HeaderTopBarStyled>
      <DotAnimation />
      <LinkOrder to={"/"}>
        Pre-order Galaxy Z 2023 - Get a great offer up to 14 million
      </LinkOrder>
    </HeaderTopBarStyled>
  );
}
