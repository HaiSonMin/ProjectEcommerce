import Heading from "@/components/Heading";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const PhoneHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandList = styled.ul`
  display: flex;
  gap: 1rem;

  .see-all {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

const BrandLinkItem = styled(Link)`
  display: inline-block;
  padding: 8px 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: var(--color-secondary);
  border-radius: 1rem;
  opacity: 0.8;
  transition: all 0.3s;

  &:hover{
    opacity: 1;
    box-shadow: var(--shadow-md);
  }
`;

const HeadingPhone = styled(Link)``;

export default function PhoneHeader() {
  return (
    <PhoneHeaderStyled>
      <HeadingPhone to={"#"}>
        <Heading $as="h2">Phone</Heading>
      </HeadingPhone>
      <BrandList>
        <li>
          <BrandLinkItem to={"#"}>Test phone 1</BrandLinkItem>
        </li>
        <li>
          <BrandLinkItem to={"#"}>Test phone 2</BrandLinkItem>
        </li>
        <li>
          <BrandLinkItem to={"#"}>Test phone 3</BrandLinkItem>
        </li>
        <li>
          <BrandLinkItem className="see-all" to={"#"}>
            See All <HiOutlineArrowNarrowRight />
          </BrandLinkItem>
        </li>
      </BrandList>
    </PhoneHeaderStyled>
  );
}
