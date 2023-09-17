import styled, { keyframes } from "styled-components";

// Define keyframes
const spinning = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1) translateZ(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1) translateZ(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1) translateZ(0);
  }
`;

const ldsEclipse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Create the styled-components
const ContainerBackground = styled.div`
  background-color: var(--color-grey-900);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  opacity: 0.6;
`;
const LoadingSpinnerWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 9rem;
  height: 9rem;
  z-index: 999;
  background: url(https://brademar.com/wp-content/uploads/2022/10/CellphoneS-Logo-PNG-2.png)
    center no-repeat;
  background-size: contain;

  &:after {
    content: "";
    position: absolute;
    width: 12rem;
    height: 12rem;
    border-radius: 100%;
    margin: -1.5rem;
    box-shadow: 0 4px 0 0 #000;
    transition: all 1s linear;
    animation: ${ldsEclipse} 1s linear infinite;
  }

  /* Apply the spinning animation to the wrapper */
  animation: ${spinning} 1.5s infinite ease-in-out;
`;

// Usage in your React component

export default function SpinnerLogo() {
  return (
    <>
      <ContainerBackground />
      <LoadingSpinnerWrapper />
    </>
  );
}
