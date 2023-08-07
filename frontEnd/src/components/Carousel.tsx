import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { css, styled } from "styled-components";
import { useState, useEffect } from "react";
const CarouselStyled = styled.div`
  position: relative;
`;

const ContainerChildren = styled.div<{ $valueTransform: number }>`
  ${(props) => css`
    transform: translateX(-${props.$valueTransform}rem);
  `}
  transition: all 0.3s;
`;

const ButtonPre = styled.div`
  position: absolute;
  left: -3.5rem;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s;
  transform: translateY(-50%);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  & svg {
    width: 50%;
    height: 50%;
    color: #fff;
    margin-right: 4px;
  }
`;

const ButtonNext = styled.div`
  position: absolute;
  right: -3.5rem;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s;
  transform: translateY(-50%);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  & svg {
    width: 50%;
    height: 50%;
    color: #fff;
    margin-left: 4px;
  }
`;

interface IProps {
  children?: React.ReactElement | any;
  gapValue: number;
  widthItem: number;
  numberProductInRow: number;
  numberProductDisplay: number;
}

export default function Carousel({
  children,
  gapValue,
  widthItem,
  numberProductInRow,
  numberProductDisplay,
}: IProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timerScroll = setInterval(() => {
      if (numberProductInRow > numberProductDisplay)
        setCurrentSlide((cur: number) =>
          cur === numberProductInRow - numberProductDisplay ? 0 : cur + 1
        );
    }, 5000);

    return () => clearInterval(timerScroll);
  }, [currentSlide]);

  const handleNextSlide = () => {
    const resultCurrentSlide = numberProductInRow - numberProductDisplay;
    setCurrentSlide((cur: number) =>
      cur === resultCurrentSlide ? 0 : cur + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((cur: number) =>
      cur === 0 ? numberProductInRow - numberProductDisplay : cur - 1
    );
  };

  const transformValue = widthItem + gapValue;

  return (
    <CarouselStyled>
      <ContainerChildren $valueTransform={transformValue * currentSlide}>
        {children}
      </ContainerChildren>
      {numberProductInRow > numberProductDisplay && (
        <>
          <ButtonPre className="btn-pre" onClick={handlePrevSlide}>
            <GoChevronLeft />
          </ButtonPre>
          <ButtonNext className="btn-next" onClick={handleNextSlide}>
            <GoChevronRight />
          </ButtonNext>
        </>
      )}
    </CarouselStyled>
  );
}
