import styled from "styled-components";
import FlagMark from "@/assets/icons/member/red-flag.png";
import IconLogoWeb from "@/assets/icons/icon-logo-web.png";

const InputRankStyled = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  border-radius: 8px;
  margin-top: 3.6rem;
`;

const BoxSlide = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const SlideNotCompleted = styled.div<{ $width: number }>`
  position: absolute;
  z-index: 1;
  background-color: var(--color-grey-300);
  width: 100%;
  height: 100%;
  left: 0;
`;
const SlideCompleted = styled.div<{ $width: number }>`
  position: absolute;
  z-index: 10;
  background-color: var(--color-primary);
  left: 0;
  height: 100%;
  width: ${(props) => `${props.$width}%`};
`;
const Dot = styled.div<{ $left: number }>`
  position: absolute;
  z-index: 100;
  width: 1.6rem;
  height: 1.6rem;
  background-color: var(--color-primary);
  border-radius: 50%;
  left: ${(props) => `${props.$left}%`};
  top: -50%;
  transform: translateX(-50%);
`;

const IconWeb = styled.div<{ $left: number }>`
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  left: ${(props) => `${props.$left}%`};
  transform: translateX(-50%);
  top: -3rem;
  z-index: 100;
`;

const Flag = styled.div`
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  right: -1rem;
  top: -2.4rem;
  z-index: 100;
`;

interface IProps {
  minPrice: number;
  maxPrice: number;
  currentPrice: number;
}

export default function InputRank({
  minPrice,
  maxPrice,
  currentPrice,
}: IProps) {
  // width calculated by percent
  const widthSlideCompleted = Math.floor((currentPrice / maxPrice) * 100);
  const widthSlideNotCompleted = 100 - widthSlideCompleted;
  return (
    <InputRankStyled>
      <BoxSlide>
        <SlideCompleted $width={widthSlideCompleted} />
        <SlideNotCompleted $width={widthSlideNotCompleted} />
      </BoxSlide>
      <Dot $left={widthSlideCompleted} />
      <Flag>
        <img src={FlagMark} alt="Flag Mark" />
      </Flag>
      <IconWeb $left={widthSlideCompleted}>
        <img src={IconLogoWeb} alt="Icon Ưeb" />
      </IconWeb>
    </InputRankStyled>
  );
}
