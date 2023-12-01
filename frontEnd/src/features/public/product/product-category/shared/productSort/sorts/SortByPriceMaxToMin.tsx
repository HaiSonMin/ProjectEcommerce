import { FaSortAmountDown } from "react-icons/fa";
import StyledItemSort from "../StyledItemSort";
import { useSearchParams } from "react-router-dom";
import SORT_CONSTANTS from "../constant";

export default function SortByPriceMaxToMin({ handlerSetSort }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <StyledItemSort active={true} handlerSetSort={handlerSetSort}>
      <FaSortAmountDown />
      <p>High to low</p>
    </StyledItemSort>
  );
}
