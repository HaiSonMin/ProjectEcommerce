import React from "react";
import { FaSearch, FaSkype } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import styled from "styled-components";
import ForumSearch from "@/components/ForumSearch";
const HeaderContainer = styled.div`
  padding: 1rem 10%;
  background-color: red;
  position: relative;
  width: 100%;
  color: var(--color-grey-0);
  font-size: 1.5rem;
`;
const FlexContianer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FaSkypeIcon = styled(FaSkype)`
  border: 1px white solid;
  box-shadow: 5px;
  font-size: 50px;
  color: #fff;
`;
const RxAvatarIcon = styled(RxAvatar)`
  font-size: 3rem;
`
const FlexLeft = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
`;
const FlexRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .8rem 1.5rem;
  border-radius: 1rem;
  background-color: rgba(235, 225, 225, 0.4);
  -webkit-backdrop-filter: blur(5px);
  
`;
const IconS = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  h1 {
    font-size: 5rem;
  }
`;
const SearchBox = styled.div`
  padding-top: 1rem;
`;
// const InputSearch = styled.input``;

export default function Header() {
  return (
    <HeaderContainer>
      <FlexContianer>
        <FlexLeft>
          <IconS>
            <FaSkypeIcon />
            <h1>forum.vn</h1>
          </IconS>
          <SearchBox>
            <ForumSearch type="text" placeholder="Tìm kiếm" />
          </SearchBox>
        </FlexLeft>
        <FlexRight>
          <RxAvatarIcon/>
          <p>Smember</p>
        </FlexRight>
      </FlexContianer>
    </HeaderContainer>
  );
}
