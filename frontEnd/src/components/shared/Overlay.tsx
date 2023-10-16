import styled, { css, keyframes } from "styled-components";

const animateDisplay = keyframes`
  0% {opacity:0}
  100% {opacity:1}
`;

const Overlay = styled.div<{ $isShow: boolean }>`
  display: ${({ $isShow }) => !$isShow && "none"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  ${(props) =>
    props.$isShow &&
    css`
      animation: ${animateDisplay} 0.3s cubic-bezier(0.79, 0.8, 0.57, 0.65)
        forwards;
    `}
`;

export default Overlay;
