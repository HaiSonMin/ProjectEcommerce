import { Link } from "react-router-dom";
import { css, styled } from "styled-components";
import { useState, useEffect } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
const items = [
  {
    img: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/ROG6-series-sliding-0097.png",
    title: "ROG phone 6",
    label: "ROG phone 6",
  },
  {
    img: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/2355-1024-nord3.png",
    title: "One plus",
    label: "One plus",
  },
  {
    img: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/photo_2023-07-22_11-25-34-ghe-gaming-mo-ban.jpg",
    title: "Ghế gaming",
    label: "Ghế gaming",
  },
  {
    img: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/realme-11-sliding-dat-truoc-11.jpg",
    title: "Realme 11",
    label: "Realme 11",
  },
  {
    img: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/bts-apple-sliding.png",
    title: "Realme 12",
    label: "Realme 12",
  },
  {
    img: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-tab-s9-dat-hang.png",
    title: "Realme 13",
    label: "Realme 13",
  },
];

const CarouselStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1rem;
  width: 60%;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);

  &:hover .btn-pre {
    left: -3rem;
  }

  &:hover .btn-next {
    right: -3rem;
  }
  transition: transform 0.3s ease;
`;

//////////////////////////////////////////
const CarouselTop = styled.div`
  position: relative;
  width: 100%;
  height: 82%;
  z-index: 1;
`;

const CarouselLinkImg = styled(Link)<{ $transform: string }>`
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  ${(props) => css`
    transform: translateX(${props.$transform});
  `}
  transition: transform 0.3s ease;

  & img {
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

const ButtonPre = styled.div`
  position: absolute;
  left: -6rem;
  top: 11rem;
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
  right: -6rem;
  top: 11rem;
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
//////////////////////////////////////////
const CarouselBottom = styled.div`
  position: relative;
  margin-top: auto;

  height: 18%;
  width: 100%;
`;

const CarouselTitle = styled.div<{
  $transform: string;
  $active: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 1.2rem;
  text-align: center;
  top: 0;
  width: 20%;
  height: 100%;
  ${(props) => css`
    transform: translateX(${props.$transform});
    border-bottom: ${props.$active ? "2px solid var(--color-primary)" : "none"};
  `}
  transition: transform 0.3s ease;

  cursor: pointer;

  &:hover {
    background-color: var(--color-secondary);
  }
  .active {
    font-weight: 600;
  }
`;

interface IProps {
  items: Array<{ img: string; title: string; label: string }>;
}

export default function CarouselTopHome(props: IProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((cur) => (cur === items.length - 1 ? 0 : cur + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((cur) => (cur === items.length - 1 ? 0 : cur + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((cur) => (cur === 0 ? items.length - 1 : cur - 1));
  };

  return (
    <CarouselStyled>
      <CarouselTop>
        {items.map((item, index) => (
          // Render carousel items with the corresponding transforms
          <CarouselLinkImg
            key={index}
            to={"/"}
            $transform={`${100 * (index - currentSlide)}%`}
          >
            <img src={item.img} alt={item.title} />
          </CarouselLinkImg>
        ))}
        <ButtonPre className="btn-pre" onClick={handlePrevSlide}>
          <GoChevronLeft />
        </ButtonPre>
        <ButtonNext className="btn-next" onClick={handleNextSlide}>
          <GoChevronRight />
        </ButtonNext>
      </CarouselTop>
      <CarouselBottom>
        {items.map((item, index) => (
          // Render carousel titles with the corresponding transforms
          <CarouselTitle
            key={index}
            $transform={`${100 * (index - currentSlide)}%`}
            $active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          >
            <p className={`${index === currentSlide && "active"}`}>
              <span className="uppercase">{item.title}</span>
              <br />
              <span>{item.label}</span>
            </p>
          </CarouselTitle>
        ))}
      </CarouselBottom>
    </CarouselStyled>
  );
}
