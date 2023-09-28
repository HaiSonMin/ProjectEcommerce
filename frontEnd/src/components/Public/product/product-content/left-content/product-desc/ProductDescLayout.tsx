import { css, styled } from "styled-components";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";

const ProductDescLayoutStyled = styled.div`
  width: 100%;
`;

const ProductDesc = styled.div<{ $showDetail: boolean }>`
  position: relative;
  padding: 2rem 1.5rem 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
  overflow: hidden;
  ${(props) =>
    !props.$showDetail &&
    css`
      max-height: 50vh;
    `}
`;

const BoxButton = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: 4rem;
  font-size: 1.4rem;
  background: linear-gradient(
    180deg,
    rgb(255 255 255 / 50%),
    hsla(0, 0%, 100%, 0.81) 30%,
    #fff 90%
  );
`;

const ButtonShowMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  gap: 8px;
  background-color: #fff;
  padding: 5px 3rem;
  width: 30rem;
  box-shadow: var(--shadow-around);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;

  & svg {
    transition: all 0.3s;
  }

  &:hover {
    color: var(--color-primary);
    outline: 1px solid var(--color-primary);
    background-color: var(--color-red-100);

    & svg {
      scale: 1.15;
    }
  }
`;

interface IProps {
  productDesc: any;
}

export default function ProductDescLayout({ productDesc }: IProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handlerSetShowDetail = () => setShowDetail(!showDetail);

  return (
    <ProductDescLayoutStyled>
      <ProductDesc $showDetail={showDetail}>
        {productDesc}
        {!showDetail && (
          <BoxButton>
            <ButtonShowMore onClick={handlerSetShowDetail}>
              <span>Xem bài viết chi tiết</span>
              <FaRegEye />
            </ButtonShowMore>
          </BoxButton>
        )}
      </ProductDesc>
    </ProductDescLayoutStyled>
  );
}
