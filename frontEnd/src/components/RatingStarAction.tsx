import { styled } from "styled-components";
import { BiSolidStar, BiStar } from "react-icons/bi";
const RatingStarActionStyled = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & p {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const RatingBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LevelRating = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.$isActive && "var(--color-organ-600)"};

  & svg {
    color: var(--color-organ-600);
    width: 4rem;
    height: 3rem;
    cursor: pointer;
  }
`;

const LEVEL_RATING = ["Rất Tệ", "Tệ", "Bình Thường", "Tốt", "Rất Tốt"];

interface IProps {
  ratingPoint: number;
}

export default function RatingStarAction({ ratingPoint }: IProps) {
  return (
    <RatingStarActionStyled>
      <p>Bạn thấy sản phẩm này như thế nào?</p>
      <RatingBox>
        {LEVEL_RATING.map((level, index) => (
          <LevelRating $isActive={index + 1 === ratingPoint}>
            {ratingPoint >= index + 1 ? <BiSolidStar /> : <BiStar />}
            <p>{level}</p>
          </LevelRating>
        ))}
      </RatingBox>
    </RatingStarActionStyled>
  );
}
