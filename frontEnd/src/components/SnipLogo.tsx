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
    background-color: #777171; 
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 1000vh;
    height: 1000vh; 
    z-index: 200;
`;
const LoadingSpinnerWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%) translateZ(0);
  top: 50%;
  width: 90px;
  height: 90px;
  z-index: 1;
  background: url(https://brademar.com/wp-content/uploads/2022/10/CellphoneS-Logo-PNG-2.png)
    center no-repeat;
  background-size: contain;

  &:after {
    content: "";
    position: absolute;
    width: 12rem;
    height: 12rem;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 100%;
    margin: -15px;
    box-shadow: 0 4px 0 0 #000;
    transition: all 1s linear;
    animation: ${ldsEclipse} 1s linear infinite;
  }

  /* Apply the spinning animation to the wrapper */
  animation: ${spinning} 1.5s infinite ease-in-out;
`;

// Usage in your React component

export default function SniperLogo () {
    return(
        <ContainerBackground>
        <LoadingSpinnerWrapper></LoadingSpinnerWrapper>
      </ContainerBackground>
      )
}
    
