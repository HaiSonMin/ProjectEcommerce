import Heading from "@/components/shared/Heading";
import { useFilter } from "../context/FilterProvider";
import { RiDeleteBinLine } from "react-icons/ri";
import { keyframes, styled } from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";

const animationRemove = keyframes`
  0%   {transform: scale(1)}
  50% {transform: scale(1.15)}
  100% {transform: scale(1)}
 `;

const OptionsSelectingStyled = styled.div`
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

export default function OptionsSelecting() {
  const {
    filtersSelecting,
    handlerRemoveFilterSelectingCenter,
    handlerRemoveAllFilterSelecting,
  } = useFilter();
  return (
    <OptionsSelectingStyled>
      {filtersSelecting.length > 0 && (
        <>
          <Heading $as="h4">Đang lọc theo:</Heading>
          <div className="options-box">
            {filtersSelecting.map((filterName) => (
              <div
                className="item-option"
                onClick={() => handlerRemoveFilterSelectingCenter(filterName)}
              >
                <span>{filterName}</span>
                <IoCloseCircleOutline />
              </div>
            ))}
            {filtersSelecting.length > 1 && (
              <div
                className="item-option"
                onClick={handlerRemoveAllFilterSelecting}
              >
                <span>Delete All</span>
                <RiDeleteBinLine />
              </div>
            )}
          </div>
        </>
      )}
    </OptionsSelectingStyled>
  );
}
