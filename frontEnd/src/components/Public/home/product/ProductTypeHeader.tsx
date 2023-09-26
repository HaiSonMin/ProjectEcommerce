import Heading from "@/components/Heading";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IBrand, IProductCategory } from "@/interfaces";
import { randomKey } from "@/utils";

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

  &:hover {
    opacity: 1;
    box-shadow: var(--shadow-md);
  }
`;

const HeadingPhone = styled(Link)``;

interface IProps {
  categoryName: string;
  categoryBrands: Array<IBrand>;
}

export default function ProductTypeHeader({
  categoryName,
  categoryBrands,
}: IProps) {
  let brandsDisplay: Array<string>;

  if (categoryBrands.length <= 10)
    brandsDisplay = categoryBrands.map((category) => category.brand_name);
  else
    brandsDisplay = categoryBrands
      .map((category) => category.brand_name)
      .slice(0, 7);

  return (
    <PhoneHeaderStyled>
      <HeadingPhone to={"#"}>
        <Heading $as="h2">{categoryName}</Heading>
      </HeadingPhone>
      <BrandList>
        {brandsDisplay.map((brandName) => (
          <li key={randomKey()}>
            <BrandLinkItem to={"#"}>{brandName}</BrandLinkItem>
          </li>
        ))}
        <li>
          <BrandLinkItem className="see-all" to={"#"}>
            See All <HiOutlineArrowNarrowRight />
          </BrandLinkItem>
        </li>
      </BrandList>
    </PhoneHeaderStyled>
  );
}
