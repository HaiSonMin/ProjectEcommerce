import { HiOutlineReceiptPercent } from "react-icons/hi2";
import StyledItemSort from "../StyledItemSort";
import { useSearchParams } from "react-router-dom";

export default function SortByDiscountPercentage({ handlerSetSort }) {
  const [searchParams, setSearchParams] = useSearchParams();



  return (
    <StyledItemSort active={true} handlerSetSort={handlerSetSort}>
      <HiOutlineReceiptPercent />
      <p>Big Discount</p>
    </StyledItemSort>
  );
}
