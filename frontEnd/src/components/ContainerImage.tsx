import { css, styled } from "styled-components";
import { Card, Carousel } from ".";
import { Link } from "react-router-dom";

const ContainerImgLinkStyled = styled.div`
  padding: 1rem 6px;
  overflow: hidden;
  width: 100%;
`;

// All withCard + all with Gap(1rem)
const ContainerImgLinks = styled.div<{
  $withImg: number;
  $gap: number;
  $itemsImg: Array<any>;
}>`
  display: flex;
  gap: ${(props) => props.$gap}rem;
  flex-wrap: wrap;
  width: ${(props) => css`
    ${props.$withImg * props.$itemsImg.length +
    props.$gap * props.$itemsImg.length}rem
  `};
`;

const ItemLink = styled(Link)<{ $width: number }>`
  display: inline-block;
  border-radius: 1rem;
  overflow: hidden;
  width: ${(props) => props.$width}rem;
  & img {
    object-fit: contain;
    object-position: center;
  }
`;

interface IProps {
  itemsImg: Array<{ img: string; linkTo: string }>;
  gapValue: number;
  withImg: number;
  numberProductDisplay: number;
}

export default function ContainerImage({
  itemsImg,
  gapValue,
  withImg,
  numberProductDisplay,
}: IProps) {
  const numberProductInRow = itemsImg.length;

  return (
    <ContainerImgLinkStyled>
      <Carousel
        gapValue={gapValue}
        widthItem={withImg}
        numberProductDisplayOnScreen={numberProductDisplay}
        numberProductInRow={numberProductInRow}
      >
        <ContainerImgLinks
          $withImg={withImg}
          $gap={gapValue}
          $itemsImg={itemsImg}
        >
          {itemsImg.map((item) => (
            <ItemLink
              $width={withImg}
              key={Math.ceil(Math.random() * 1000000)}
              to={item.linkTo}
            >
              <img src={item.img} alt="Image " />
            </ItemLink>
          ))}
        </ContainerImgLinks>
      </Carousel>
    </ContainerImgLinkStyled>
  );
}
