import { randomKey } from "@/utils";
import { BiSolidStar } from "react-icons/bi";
import { styled } from "styled-components";

const ProductRatedBoarRightStyled = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem 1rem 1.5rem;
`;

const RatedItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NumberStar = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 600;
  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-organ-600);
    margin-bottom: 1px;
  }
`;

const PercentBar = styled.div<{ $percentRated: number }>`
  position: relative;
  background-color: var(--color-grey-200);
  height: 8px;
  flex-grow: 1;
  border-radius: 1rem;

  &::before {
    position: absolute;
    width: ${(props) => props.$percentRated}%;
    content: "";
    display: block;
    height: 8px;
    border-radius: 1rem;
    background-color: var(--color-primary);
  }
`;

const InfoRated = styled.p`
  font-size: 1.2rem;
  color: var(--color-text);
`;

const NUMBER_STAR = 5;

export default function ProductRatedBoarRight() {
  return (
    <ProductRatedBoarRightStyled>
      {Array.from({ length: NUMBER_STAR }, (_, index) => {
        return (
          <RatedItem key={randomKey()}>
            <NumberStar>
              <span>{NUMBER_STAR - index}</span> <BiSolidStar />
            </NumberStar>
            <PercentBar $percentRated={20} />
            <InfoRated>2 đánh giá</InfoRated>
          </RatedItem>
        );
      })}
    </ProductRatedBoarRightStyled>
  );
}
