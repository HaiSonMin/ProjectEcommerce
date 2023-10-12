import { styled } from "styled-components";
import { useFilter } from "../context/FilterProvider";

const OptionsFilterBoxStyled = styled.div<{
  $display: boolean;
  $minWidth?: number;
}>`
  position: absolute;
  top: 4.6rem;
  left: 0;
  display: ${(props) => (props.$display ? "flex" : "none")};
  flex-wrap: wrap;
  gap: 8px;
  min-width: ${(props) =>
    !props.$minWidth ? "35rem" : `${props.$minWidth}rem`};
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

interface IProps {
  children: any;
  minWidth?: number;
  isDisplay: boolean;
  optionSelected: boolean;
  handlerCloseBox: () => void;
}

export default function OptionsFilterBox({
  children,
  minWidth,
  isDisplay,
  optionSelected,
  handlerCloseBox,
}: IProps) {
  const {
    filtersSelecting,
    handlerAddFilterSelectedCenter,
    handlerRemoveAllFilterSelecting,
  } = useFilter();

  const handlerClickApply = () => {
    handlerAddFilterSelectedCenter(filtersSelecting);
    handlerCloseBox();
  };

  return (
    <OptionsFilterBoxStyled
      $display={isDisplay}
      $minWidth={minWidth}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      {optionSelected && (
        <FooterBoxOptions>
          <button className="btn-close" onClick={handlerCloseBox}>
            Close
          </button>
          <button className="btn-apply" onClick={handlerClickApply}>
            Apply
          </button>
        </FooterBoxOptions>
      )}
    </OptionsFilterBoxStyled>
  );
}
