import { Link } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../assets/logos/logo_light.png";
const LogoStyled = styled(Link)`
  text-align: center;
  padding: 0rem 2rem;
`;

const Img = styled.img`
  height: 8rem;
  width: auto;
  margin: auto;
  object-fit: contain;
  object-position: center;
`;

const Logo = () => {
  return (
    <LogoStyled to={"/"}>
      <Img src={logo} alt="Logo Web Site" />
    </LogoStyled>
  );
};

export default Logo;
