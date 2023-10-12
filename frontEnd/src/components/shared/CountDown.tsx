import { css, keyframes, styled } from "styled-components";

const CountDowStyled = styled.div``;

const flipTop = keyframes`
    100% {
        background-color: red;
        transform: rotateX(90deg);
    }
`;

const flipBottom = keyframes`
    100% {
        background-color: red;
        transform: rotateX(0deg);
    }
`;

const sharedStyles = css`
  line-height: 1;
  height: 0.75em;
  padding: 0.25em;
  overflow: hidden;
  text-align: center;
`;

const FlipCard = styled.div<{ $time: string }>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-white);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 6px #000;

  &::before {
    display: block;
    content: ${(props) => props.$time};
    position: absolute;
    width: 100%;
    ${sharedStyles}
    transform-origin: bottom;
    /* animation: ${flipTop} 2s ease-in infinite; */
  }

  &::after {
    display: block;
    content: ${(props) => props.$time};
    position: absolute;
    display: flex;
    align-items: flex-end;
    width: 100%;
    bottom: 0;
    ${sharedStyles}
    transform-origin: top;
    transform: rotateX(90deg);
    /* animation: ${flipBottom} 2s ease-out infinite; */
  }
`;

const Top = styled.div`
  background-color: #000;
  ${sharedStyles};
`;

const Bottom = styled.div`
  background-color: #111010;
  ${sharedStyles}
  display: flex;
  align-items: flex-end;
`;

interface IProps {
  hour: string;
  minute: string;
  second: string;
}

export default function CountDown({ hour, minute, second }: IProps) {
  const hourDisplay: string = "";
  const minuteDisplay: string = "";
  const secondDisplay: string = "";

  return (
    <CountDowStyled>
      <FlipCard $time={second}>
        <Top>{second}</Top>
        <Bottom>{second}</Bottom>
      </FlipCard>
    </CountDowStyled>
  );
}
