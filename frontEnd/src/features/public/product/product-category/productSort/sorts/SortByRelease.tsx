import { MdFiberNew } from "react-icons/md";
import StyledItemSort from "../StyledItemSort";
import { useSearchParams } from "react-router-dom";

export default function SortByRelease({ handlerSetSort }) {
  const [searchParams] = useSearchParams();

    const isActive =  searchParams.get("")

  return (
    <StyledItemSort active={true} handlerSetSort={handlerSetSort}>
      <MdFiberNew />
      <p>Release (New)</p>
    </StyledItemSort>
  );
}
