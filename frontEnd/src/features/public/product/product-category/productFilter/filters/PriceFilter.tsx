import { useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";
import { GiMoneyStack } from "react-icons/gi";
import ItemFilterType from "./ItemFilterType";
import InputRangeTwoValueV2 from "@/components/InputRangeTwoValue";
import { formatCurrencyVND } from "@/utils";
import { useFilter } from "../context/FilterProvider";

const PriceFilterStyled = styled.div``;

const OptionsFilterBoxStyled = styled.div<{
  $display: boolean;
}>`
  position: absolute;
  top: 4.6rem;
  left: 0;
  display: ${(props) => (props.$display ? "block" : "none")};
  gap: 8px;
  min-width: 35rem;
  padding: 1rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-around-dark);
  border-radius: 1rem;
  cursor: auto;
  z-index: 5;

  &::after {
    content: "";
    position: absolute;
    left: 3rem;
    top: -1rem;
    border-bottom: 1rem solid var(--color-white);
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
  }
`;

const FooterBoxOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 4px;

  & .btn-close,
  .btn-apply {
    display: block;
    font-size: 1.6rem;
    width: 100%;
    padding: 6px 0;
    font-weight: 600;
  }

  & .btn-close {
    color: var(--color-primary);
    background-color: var(--color-red-100);
  }

  & .btn-apply {
    color: var(--color-white);
    background-color: var(--color-primary);
  }
`;

const BoxDisplayPrice = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const InputPrice = css`
  padding: 4px 8px;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
`;

const InputPriceLeft = styled.div`
  ${InputPrice}
`;

const InputPriceRight = styled.div`
  ${InputPrice}
`;

interface IProps {
  minPriceProduct: number;
  maxPriceProduct: number;
}

export default function PriceFilter({
  minPriceProduct,
  maxPriceProduct,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayFilterBox, setDisplayFilterBox] = useState<boolean>(false);
  const [priceValues, setPriceValues] = useState<Array<number>>([
    minPriceProduct,
    maxPriceProduct,
  ]);
  const { filtersSelected, handlerAddFilterSelectedCenter } = useFilter();

  const isFilterPrice = filtersSelected.some(
    (filter) => typeof filter === "object"
  );
  const handlerDisplayFilterBox = () => {
    setDisplayFilterBox(!displayFilterBox);
  };

  const handlerCloseFilterBox = () => {
    setDisplayFilterBox(false);
  };

  const handlerClickDocument = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      handlerCloseFilterBox();
  };

  const handlerApplyPrice = () => {
    handlerAddFilterSelectedCenter({
      minPrice: priceValues[0],
      maxPrice: priceValues[1],
    });
    handlerCloseFilterBox();
  };

  useEffect(() => {
    document.addEventListener("click", handlerClickDocument);
    return () => document.removeEventListener("click", handlerClickDocument);
  }, []);

  return (
    <PriceFilterStyled ref={ref}>
      <ItemFilterType
        onClick={handlerDisplayFilterBox}
        isActive={isFilterPrice || displayFilterBox}
      >
        <GiMoneyStack />
        <span>Giá bán</span>
        {displayFilterBox && (
          <OptionsFilterBoxStyled
            $display={displayFilterBox}
            onClick={(e) => e.stopPropagation()}
          >
            <BoxDisplayPrice>
              <InputPriceLeft>
                {formatCurrencyVND(Math.round(priceValues[0] / 1000) * 1000)}
              </InputPriceLeft>
              <InputPriceRight>
                {formatCurrencyVND(Math.round(priceValues[1] / 1000) * 1000)}
              </InputPriceRight>
            </BoxDisplayPrice>
            <InputRangeTwoValueV2
              minPrice={minPriceProduct}
              maxPrice={maxPriceProduct}
              values={priceValues}
              setValues={setPriceValues}
            />
            <FooterBoxOptions>
              <button className="btn-close" onClick={handlerCloseFilterBox}>
                Close
              </button>
              <button className="btn-apply" onClick={handlerApplyPrice}>
                Apply
              </button>
            </FooterBoxOptions>
          </OptionsFilterBoxStyled>
        )}
      </ItemFilterType>
    </PriceFilterStyled>
  );
}
