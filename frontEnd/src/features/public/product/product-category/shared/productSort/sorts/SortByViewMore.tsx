import { FaRegEye } from "react-icons/fa";
import StyledItemSort from "../StyledItemSort";
import { useSearchParams } from "react-router-dom";

export default function SortByMoreView({ handlerSetSort }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <StyledItemSort active={true} handlerSetSort={() => handlerSetSort()}>
      <FaRegEye />
      <p>View More</p>
    </StyledItemSort>
  );
}
