/* eslint-disable react/prop-types */
import styled from "styled-components";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../utils";
import { useQueriesString } from "@/hooks";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.$active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface Props {
  countItems?: number;
}

const Pagination = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queriesString = useQueriesString();
  const limitPerPage = queriesString?.limit || CONSTANT.LIMIT_PAGE;

  const currentPage: number = Number(queriesString?.page) || 1;
  let numberPage: number = 1;
  if (props.countItems)
    numberPage = Math.ceil(Number(props?.countItems) / CONSTANT.LIMIT_PAGE);

  function handlerNextPage() {
    const next: number =
      currentPage === numberPage ? currentPage : currentPage + 1;
    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function handlerPreviousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  const pageForm = (currentPage - 1) * CONSTANT.LIMIT_PAGE + 1;
  const pageTo =
    currentPage === numberPage
      ? props.countItems
      : currentPage * CONSTANT.LIMIT_PAGE;

  if (numberPage === 1) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{pageForm}</span> to <span>{pageTo}</span> of{" "}
        <span>{props.countItems}</span> results
      </P>
      <Buttons>
        <PaginationButton
          onClick={handlerPreviousPage}
          disabled={currentPage === 1}
        >
          <GrFormPrevious /> Previous
        </PaginationButton>
        <PaginationButton
          onClick={handlerNextPage}
          disabled={currentPage === numberPage}
        >
          <GrFormNext /> Next
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
