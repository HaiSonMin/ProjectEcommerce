import { UseDemandApi } from "@/apis-use";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const IntroduceStyled = styled.div`
  max-width: 20%;
`;

const ListItems = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & li {
    min-height: calc(33.33333%);
  }
`;

const ItemLinkImage = styled(Link)`
  display: block;
  border-radius: 1rem;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  overflow: hidden;
  min-height: calc(33.3333% - 1rem);

  & img {
    height: 100%;
    object-position: center;
    transition: all 0.7s;
  }

  &:hover img {
    scale: 1.02;
  }
`;

export default function Introduce() {

  const {isGettingDemands,} = UseDemandApi.getAllDemands()

  return (
    <IntroduceStyled>
      <ListItems>
        <ItemLinkImage to={"#"}>
          <img
            src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/m14-right-homepage-th9.png"
            alt="Image"
          />
        </ItemLinkImage>
        <ItemLinkImage to={"#"}>
          <img
            src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/ipadth7-new.png"
            alt="Image"
          />
        </ItemLinkImage>
        <ItemLinkImage to={"#"}>
          <img
            src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/asus%20tuf.jpg"
            alt="Image"
          />
        </ItemLinkImage>
      </ListItems>
    </IntroduceStyled>
  );
}
