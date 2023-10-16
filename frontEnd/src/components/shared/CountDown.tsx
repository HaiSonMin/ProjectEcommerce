import { css, keyframes, styled } from "styled-components";
import Countdown from "react-countdown";
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
const LayoutContainer = styled.div`
  font-family: "Times New Roman", Times, serif;
  border-radius: 1rem;
  font-size: 16px;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content: center;
  padding: 1rem;
  gap: 5%;
  height: max-content;
  width: 100%;
`;
const Production = styled.div`
  display: flex;
  gap: 10px;
  width: max-content;
  align-items: center;
`;
const ImgAnimation = styled.img`
`;
const Button = styled.button`
  border-radius: 0.4rem;
  background: white;
  outline: none;
  border: none;
  padding: 0.4rem;
  &:hover {
    background: black;
    color: white;
  }
`;
const MainCountdown = styled.div`
  align-items: center;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  justify-content: end;
`;
const TimeCountdown = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Box = styled.div`
  background: white;
  color: black;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  padding: 0.4rem;
  text-align: center;
`;
const ContentButtonClick = styled.div``;

interface IProps {
  day: string;
  hour: string;
  minute: string;
  second: string;
}

export default function CountDownTime({ day, hour, minute, second }: IProps) {
  // const hourDisplay: string = "";
  // const minuteDisplay: string = "";
  // const secondDisplay: string = "";
  
  const dayAsNumber = parseInt(day, 10);
  const hourAsNumber = parseInt(hour, 10);
  const minuteAsNumber = parseInt(minute, 10);
  const secondAsNumber = parseInt(second, 10);
  console.log(dayAsNumber,hour,minute,second);
  const targetTime =
    Date.now() +
    dayAsNumber * 24 * 60 * 60 * 1000 +
    hourAsNumber * 60 * 60 * 1000 +
    minuteAsNumber * 60 * 1000 +
    secondAsNumber * 1000;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const formatNumber = (number) => (number < 10 ? `0${number}` : number);
    
    if (completed) {
      // Render a complete state
      return <h1> oke roi nha </h1>;
    } else {
      return (
        <TimeCountdown>
        <Box> {formatNumber(days)}</Box>:<Box> {formatNumber(hours)}</Box>:<Box> {formatNumber(minutes)}</Box>:
        <Box> {formatNumber(seconds)}</Box>
      </TimeCountdown>
      );
    }
  };
  return (
    <LayoutContainer>
      <Production>
        <Button>Điện Thoại,TV</Button>
        <Button>Laoptop, IT</Button>
        <Button>Phụ Kiện</Button>
      </Production>
      <MainCountdown>
        <ImgAnimation
          src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Gif_hotsale_cu_i_tu_n_1.gif"
          alt="animationSale"
        ></ImgAnimation>
      </MainCountdown>
      <Container>
        <div>
          <p>Bắt đầu sau:</p>
        </div>
        {/* <TimeCountdown>
          <Box> {day}</Box>:<Box> {hour}</Box>:<Box> {minute}</Box>:
          <Box> {second}</Box>
        </TimeCountdown> */}
        <Countdown date={targetTime} renderer={renderer} />
      </Container>
    </LayoutContainer>
  );
}
