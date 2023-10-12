import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { styled } from "styled-components";

const RatingStarStyled = styled.div`
  display: flex;
  gap: 4px;
  & svg {
    color: var(--color-organ-600);
    width: 1.6rem;
    height: 1.6rem;
  }
`;

interface IProps {
  ratePoint: number;
}

const NUMBER_STAR = 5;
export default function RatingStar({ ratePoint }: IProps) {
  return (
    <RatingStarStyled>
      {Array.from({ length: NUMBER_STAR }, (_, index) => {
        if (ratePoint >= index + 1) return <BiSolidStar />;
        else {
          const decimalPart: number = +ratePoint.toString().split(".")[1];
          if (!decimalPart) return <BiStar />;
          if (decimalPart < 5) return <BiSolidStarHalf />;
          return <BiSolidStar />;
        }
      })}
    </RatingStarStyled>
  );
}
