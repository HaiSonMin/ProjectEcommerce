import { Link } from "react-router-dom";
import { styled } from "styled-components";

const BannerStyled = styled(Link)`
  display: block;
  border-radius: 1rem;
  height: 7.5rem;
  overflow: hidden;
`;

export default function Banner() {
  return (
    <BannerStyled to={"#"}>
      <img
        src="https://cdn2.cellphones.com.vn/1200x75,webp,q100/https://dashboard.cellphones.com.vn/storage/banner-special-desk-b2s-new.png"
        alt="Banner home"
      />
    </BannerStyled>
  );
}
