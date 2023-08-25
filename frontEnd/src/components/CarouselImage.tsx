import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { css, styled } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CarouselImageStyled = styled.div`
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  padding: 1.2rem;
  border-radius: 1rem;
`;

const ContainerImage = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  gap: 1rem;
`;

const ImageSlideLeft = styled.div`
  position: relative;
  width: 68%;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  &:hover {
    .btn-pre,
    .btn-next {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const ImageLeft = styled(Link)<{ $valueTransform: number }>`
  display: block;
  position: absolute;
  transition: all 0.3s;
  ${(props) => css`
    transform: translateX(${props.$valueTransform}%);
  `}

  & img {
    object-fit: contain;
    object-position: center;
    width: 100%;
  }
`;

const ImageSlideRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  gap: 1rem;
`;

const ImageRight = styled(Link)`
  display: block;
  height: 48%;
  & img {
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
    max-height: 100%;
  }
`;

const ButtonChangeSlide = css`
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s;
  transform: translateY(-50%);

  & svg {
    width: 50%;
    height: 50%;
    color: #fff;
  }
`;

const ButtonPre = styled.div`
  ${ButtonChangeSlide}
  left: -3.5rem;
  justify-content: flex-end;

  & svg {
    margin-right: 4px;
  }
`;

const ButtonNext = styled.div`
  ${ButtonChangeSlide}
  right: -3.5rem;
  justify-content: flex-start;

  & svg {
    margin-left: 4px;
  }
`;

const DotsSlide = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);

  & .dot {
    content: "";
    width: 8px;
    height: 8px;
    background-color: var(--color-grey-100);
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: var(--color-grey-400);
    }
  }

  & .active {
    background-color: var(--color-orange-700);
  }
`;

interface IProps {
  // [{imageName: "",image:"",linkTo:""}]
  items: Array<any>;
}

export default function CarouselImage({ items }: IProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timerScroll = setInterval(() => {
      setCurrentSlide((cur: number) =>
        cur === items.length - 1 ? 0 : cur + 1
      );
    }, 5000);

    return () => clearInterval(timerScroll);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((cur: number) => (cur === items.length - 1 ? 0 : cur + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((cur: number) => (cur === 0 ? items.length - 1 : cur - 1));
  };

  return (
    <CarouselImageStyled>
      <ContainerImage>
        <ImageSlideLeft>
          {items.map((item, index) => (
            <ImageLeft
              to={item.linkTo}
              $valueTransform={100 * index - currentSlide * 100}
            >
              <img src={item.image} alt={item.imageName} />
            </ImageLeft>
          ))}
          {items.length > 1 && (
            <>
              <ButtonPre className="btn-pre" onClick={handlePrevSlide}>
                <GoChevronLeft />
              </ButtonPre>
              <ButtonNext className="btn-next" onClick={handleNextSlide}>
                <GoChevronRight />
              </ButtonNext>
              <DotsSlide>
                {items.map((item, index) => (
                  <div
                    className={`dot ${index === currentSlide && "active"}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </DotsSlide>
            </>
          )}
        </ImageSlideLeft>
        <ImageSlideRight>
          <ImageRight to={"#"}>
            <img
              src={"https://cdn.tgdd.vn/2021/09/banner/TraGop390-97-390x97.png"}
              alt={"Hinh anh 1"}
            />
          </ImageRight>
          <ImageRight to="#">
            <img
              src={"https://cdn.tgdd.vn/2021/09/banner/TraGop390-97-390x97.png"}
              alt={"Hinh anh 1"}
            />
          </ImageRight>
        </ImageSlideRight>
      </ContainerImage>
    </CarouselImageStyled>
  );
}
