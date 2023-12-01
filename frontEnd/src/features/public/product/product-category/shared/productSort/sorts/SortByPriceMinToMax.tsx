import { FaSortAmountDownAlt } from "react-icons/fa";
import StyledItemSort from "../StyledItemSort";
import { useSearchParams } from "react-router-dom";

export default function SortPriceMinToMax({ handlerSetSort }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <StyledItemSort active={true} handlerSetSort={handlerSetSort}>
      <FaSortAmountDownAlt />
      <p>Low to high</p>
    </StyledItemSort>
  );
}
