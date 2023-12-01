import { styled } from 'styled-components';
import ProductDescLayout from './product-desc';
import ProductRatingsLayout from './product-ratings';
import FrequentlyAskedQuestionsLayout from './FAQ';
import QuestionsAnswersLayout from './questions-answers';

const ProductLeftContentLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function ProductLeftContentLayout() {
  return (
    <ProductLeftContentLayoutStyled>
      <ProductDescLayout />
      <FrequentlyAskedQuestionsLayout />
      <ProductRatingsLayout />
      <QuestionsAnswersLayout />
    </ProductLeftContentLayoutStyled>
  );
}
