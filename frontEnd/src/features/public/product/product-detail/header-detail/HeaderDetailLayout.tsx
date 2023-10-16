import { Heading, RatingStar } from "@/components/shared";
import styled from "styled-components";

const HeaderDetailLayoutStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
`;

const NumberRating = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);

  span {
    font-weight: 600;
  }
`;

export default function HeaderDetailLayout() {
  return (
    <HeaderDetailLayoutStyled>
      <Heading $as="h4">Samsung Galaxy S23 Ultra 256GB</Heading>
      <RatingStar ratePoint={5} />
      <NumberRating>
        <span>32</span> đánh giá
      </NumberRating>
    </HeaderDetailLayoutStyled>
  );
}
