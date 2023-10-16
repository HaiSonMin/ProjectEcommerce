import { Overlay } from "@/components/shared";
import { BiSearchAlt2 } from "react-icons/bi";
import useDebounce from "@/hooks/useDebounce";
import BoxTrendSearch from "./box-trend-search";
import BoxResultSearch from "./box-result-search";
import { useRef, useState, useEffect } from "react";
import { keyframes, styled } from "styled-components";

const animateBoxSearch = keyframes`
  0% {scale:0.5}
  100% {scale:1}
`;

const ContainerInput = styled.div`
  position: relative;
  height: 3.5rem;
  max-width: 30rem;
  @media (min-width: 1024px) {
    min-width: 30rem;
  }
  .icon--search {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 2.4rem;
    height: 2.4rem;
    opacity: 0.3;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }

  .box--search {
    position: absolute;
    left: 0;
    top: 5.6rem;
    width: 50rem;
    min-height: 12rem;
    background-color: var(--color-white);
    z-index: 1000;
    border-radius: 1rem;
    animation: ${animateBoxSearch} 0.2s cubic-bezier(0.79, 0.8, 0.57, 0.65);
    overflow: hidden;

    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 20%;
      top: -1.8rem;
      border-bottom: 1.8rem solid var(--color-white);
      border-left: 1.5rem solid transparent;
      border-right: 1.5rem solid transparent;
    }
  }

  .overlay {
    margin-top: 14.8rem;
  }
`;

const SearchInput = styled.input`
  border-radius: 1rem;
  padding: 0 1.5rem;
  width: 100%;
  height: 100%;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`;

export default function HeaderSearch() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const refSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
  }, [debouncedSearchTerm]);

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <ContainerInput>
      <SearchInput
        type="text"
        placeholder="Tìm sản phẩm"
        ref={refSearch}
        onFocus={() => setIsSearching(true)}
        onChange={handleChangeSearchTerm}
        value={searchTerm}
      />
      {isSearching && (
        <div className="box--search" onClick={(e) => e.stopPropagation()}>
          {refSearch.current?.value ? <BoxResultSearch /> : <BoxTrendSearch />}
        </div>
      )}
      <Overlay
        $isShow={isSearching}
        className="overlay"
        onClick={() => setIsSearching(false)}
      />
      <BiSearchAlt2 className="icon--search" />
    </ContainerInput>
  );
}
