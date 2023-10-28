import { styled } from "styled-components";
import PhoneHeaderLayout from "./ProductTypeHeader";
import PhoneContainerCard from "./ProductTypeContainerCard";
import { IProductCategory } from "@/interfaces/models";

const ProductTypeLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  category: IProductCategory | undefined;
}

export default function ProductTypeLayout({ category }: IProps) {
  const categoryName: string = category?.productCategory_name || "Product";
  const categoryBrands = category?.productCategory_brands || [];
  return (
    <ProductTypeLayoutStyled>
      <PhoneHeaderLayout
        categoryName={categoryName}
        categoryBrands={categoryBrands}
      />
      <PhoneContainerCard categoryId={category?._id} />
    </ProductTypeLayoutStyled>
  );
}
