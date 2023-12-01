import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { css, styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStateProductDetail,
  setChoseColorImageProduct,
  setChoseColorProduct,
} from '@/storeReducer/public/productDetailSlice';
const CarouselImageStyled = styled.div`
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 1rem;
  overflow: hidden;
`;

const ImageSlide = styled.div`
  position: relative;
  height: 40rem;
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

const ImageItem = styled.div<{ $valueTransform: number }>`
  ${({ $valueTransform }) => css`
    transform: translateX(${$valueTransform}%);
  `}
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.3s;

  & img {
    height: 96%;
    width: 50%;
    margin: 1% auto;
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
    color: var(--color-white);
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
    content: '';
    width: 8px;
    height: 8px;
    background-color: var(--color-grey-300);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.7s;

    &:hover {
      background-color: var(--color-grey-400);
    }
  }

  & .active {
    background-color: var(--color-primary);
    width: 1.6rem;
    border-radius: 1rem;
  }
`;

interface IProps {
  images: Array<string>;
}

export default function CarouselImage({ images }: IProps) {
  const dispatch = useDispatch();
  const { optionColorChoseImage } = useSelector(getStateProductDetail);

  const handleNextSlide = () => {
    dispatch(
      setChoseColorImageProduct(
        optionColorChoseImage === images.length - 1
          ? 0
          : optionColorChoseImage + 1
      )
    );
  };

  const handlePrevSlide = () => {
    dispatch(
      setChoseColorImageProduct(
        optionColorChoseImage === 0
          ? images.length - 1
          : optionColorChoseImage - 1
      )
    );
  };

  return (
    <CarouselImageStyled>
      <ImageSlide>
        {images?.map((image, index) => (
          <ImageItem
            $valueTransform={100 * index - optionColorChoseImage * 100}
          >
            <img src={image} alt={`Image product ${index}`} />
          </ImageItem>
        ))}
        {images?.length > 1 && (
          <>
            <ButtonPre className='btn-pre' onClick={handlePrevSlide}>
              <GoChevronLeft />
            </ButtonPre>
            <ButtonNext className='btn-next' onClick={handleNextSlide}>
              <GoChevronRight />
            </ButtonNext>
            <DotsSlide>
              {images?.map((_, index) => (
                <div
                  className={`dot ${
                    index === optionColorChoseImage && 'active'
                  }`}
                  onClick={() => dispatch(setChoseColorImageProduct(index))}
                />
              ))}
            </DotsSlide>
          </>
        )}
      </ImageSlide>
    </CarouselImageStyled>
  );
}
