import { css, styled } from "styled-components";
import { Card, Carousel } from ".";

const ContainerCardStyled = styled.div`
  padding: 1rem 6px;
  overflow: hidden;
`;

// All withCard + all with Gap(1rem)
const ContainerCards = styled.div<{
  $withCard: number;
  $gap: number;
  $products: Array<any>;
}>`
  display: flex;
  gap: ${(props) => props.$gap}rem;
  flex-wrap: wrap;
  width: ${(props) => {
    if (props.$products.length > 10)
      return css`
        ${(props.$withCard * props.$products.length) / 2 +
        props.$gap * (props.$products.length / 2)}rem
      `;
    return css`
      ${props.$withCard * props.$products.length +
      props.$gap * props.$products.length}rem
    `;
  }};
`;

interface IProps {
  products: Array<any>;
  gapValue: number;
  withCard: number;
  numberProductDisplay: number;
}

export default function ContainerCard({
  products,
  gapValue,
  withCard,
  numberProductDisplay,
}: IProps) {
  const numberProductInRow =
    products.length > 10 ? products.length / 2 : products.length;
  return (
    <ContainerCardStyled>
      <Carousel
        gapValue={gapValue}
        widthItem={withCard}
        numberProductDisplay={numberProductDisplay}
        numberProductInRow={numberProductInRow}
      >
        <ContainerCards $withCard={withCard} $gap={1} $products={products}>
          {products.map((product) => (
            <Card
              width={withCard}
              item={product}
              key={Math.ceil(Math.random() * 1000000)}
            />
          ))}
        </ContainerCards>
      </Carousel>
    </ContainerCardStyled>
  );
}
