import Heading from "@/components/shared/Heading";
import { useFilter } from "../../context/FilterProvider";
import { RiDeleteBinLine } from "react-icons/ri";
import { keyframes, styled } from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { formatCurrencyVND } from "@/utils";

const animationRemove = keyframes`
  0%   {transform: scale(1)}
  50% {transform: scale(1.15)}
  100% {transform: scale(1)}
 `;

const OptionsSelectedStyled = styled.div`
  & .options-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 1.2rem;
    & .item-option {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 4px 8px;
      color: var(--color-primary);
      border-radius: 1rem;
      border: 1px solid var(--color-primary);
      background-color: var(--color-red-100);
      margin-top: 6px;
      cursor: pointer;

      & svg {
        color: var(--color-primary);
        width: 1.6rem;
        height: 1.6rem;
        transition: all 0.3s;
      }

      &:hover {
        svg {
          animation: ${animationRemove} 1s cubic-bezier(0.66, 0, 0, 1) infinite;
        }
      }
    }
  }
`;

export default function OptionsSelected() {
  const {
    filtersSelected,
    handlerRemoveFilterSelectedCenter,
    handlerRemoveAllFilterSelected,
    handlerRemoveAllFilterSelecting,
  } = useFilter();

  const handlerDeleteAll = () => {
    handlerRemoveAllFilterSelected();
    handlerRemoveAllFilterSelecting();
  };

  return (
    <OptionsSelectedStyled>
      {filtersSelected.length > 0 && (
        <>
          <Heading $as="h4" className="mt-[1.6rem]">
            Đã lọc theo:
          </Heading>
          <div className="options-box">
            {filtersSelected.map((filterName) => (
              <div
                className="item-option"
                onClick={() => handlerRemoveFilterSelectedCenter(filterName)}
              >
                {typeof filterName === "string" ? (
                  <span>{filterName}</span>
                ) : (
                  <span>
                    Giá từ:{" "}
                    {formatCurrencyVND(Number(filterName?.minPrice))}
                    {" - "}
                    {formatCurrencyVND(Number(filterName?.maxPrice))}
                  </span>
                )}
                <IoCloseCircleOutline />
              </div>
            ))}
            {filtersSelected.length > 1 && (
              <div className="item-option" onClick={handlerDeleteAll}>
                <span>Delete All</span>
                <RiDeleteBinLine />
              </div>
            )}
          </div>
        </>
      )}
    </OptionsSelectedStyled>
  );
}
