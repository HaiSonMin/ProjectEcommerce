import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { css, styled } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dot from "./Dot";
const CarouselCardBlogStyled = styled.div`
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 1rem;
  overflow: hidden;
`;

const CardBlogSlide = styled.div`
  position: relative;
  min-height: 37rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  background-color: var(--color-grey-100);

  &:hover {
    .btn-pre,
    .btn-next {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const CardBlogItem = styled(Link)<{ $valueTransform: number }>`
  display: block;
  position: absolute;
  transition: all 0.7s;
  width: 100%;

  ${(props) => css`
    transform: translateX(${props.$valueTransform}%);
  `}

  .box--image {
    height: 26rem;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .box--content {
    padding: 1rem;

    &-title {
      font-weight: 600;
      margin-bottom: 1.3rem;
    }

    &-level {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 1.4rem;
      color: var(--color-grey-500);
    }
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
  bottom: 1%;
  transform: translateX(-50%);
`;

interface IProps {
  // [{title: "",thumb:"",linkTo:""}]
  items: Array<any>;
}

const PERCENTAGE_TRANSFORM = 100;

export default function CarouselCardBlog({ items }: IProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timerScroll = setInterval(() => {
      setCurrentSlide((cur: number) =>
        cur === items.length - 1 ? 0 : cur + 1
      );
    }, 522000);

    return () => clearInterval(timerScroll);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((curSlide: number) =>
      curSlide === items.length - 1 ? 0 : curSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((curSlide: number) =>
      curSlide === 0 ? items.length - 1 : curSlide - 1
    );
  };

  return (
    <CarouselCardBlogStyled>
      <CardBlogSlide>
        {items.map((item, index) => (
          <CardBlogItem
            to={item.linkTo}
            $valueTransform={
              PERCENTAGE_TRANSFORM * index - currentSlide * PERCENTAGE_TRANSFORM
            }
          >
            <div className="box--image">
              <img src={item.thumb} alt="thumb image card" />
            </div>
            <div className="box--content">
              <p className="box--content-title">{item.title}</p>
              <div className="box--content-level">
                <span>Dễ</span>
                <Dot
                  $isActive={false}
                  $size={5}
                  $backgroundColor="var(--color-grey-500)"
                />
                <span>Làm trong 40 phút</span>
              </div>
            </div>
          </CardBlogItem>
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
              {items.map((_, index) => (
                <Dot
                  $isActive={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                  $backgroundColor="var(--color-grey-300)"
                />
              ))}
            </DotsSlide>
          </>
        )}
      </CardBlogSlide>
    </CarouselCardBlogStyled>
  );
}
