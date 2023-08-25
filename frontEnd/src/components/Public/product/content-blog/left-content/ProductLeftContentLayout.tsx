import { styled } from "styled-components";
import ProductDescLayout from "./product-desc";
import ProductRatingsLayout from "./product-ratings";
import FrequentlyAskedQuestionsLayout from "./FAQ";
import QuestionsAnswersLayout from "./questions-answers";

const ProductLeftContentLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 70%;
`;

export default function ProductLeftContentLayout() {
  return (
    <ProductLeftContentLayoutStyled>
      <ProductDescLayout productDesc={"abc"} />
      <ProductRatingsLayout />
      <FrequentlyAskedQuestionsLayout />
      <QuestionsAnswersLayout />
    </ProductLeftContentLayoutStyled>
  );
}
