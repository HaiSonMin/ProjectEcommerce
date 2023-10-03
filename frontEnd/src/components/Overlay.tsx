import styled from "styled-components";

const Overlay = styled.div<{ $isShow: boolean }>`
  display: ${({ $isShow }) => !$isShow && "none"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

export default Overlay;
