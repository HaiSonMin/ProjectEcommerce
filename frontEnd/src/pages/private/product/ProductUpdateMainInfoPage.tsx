import { styled } from "styled-components";
import { Heading, Spinner } from "@/components";
import { ProductMainInfo } from "@/features/admin/product";
import { IProductMainInfo } from "@/interfaces/product/product.interface";
import UseProductApi from "@/features/admin/product/UseProductApi";

const StyledGroupProductCard = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function ProductUpdateMainInfoPage() {
  const { isGettingProduct, metadata } = UseProductApi.getProductById();
  const productMainInfos: Array<IProductMainInfo> =
    metadata?.product_mainInfo || [];
  console.log(productMainInfos);
  if (isGettingProduct) return <Spinner />;
  return (
    <>
      <Heading $as="h1">Update Product Main Info</Heading>
      <StyledGroupProductCard>
        {productMainInfos.map((mainInfo) => (
          <ProductMainInfo
            product={metadata}
            key={mainInfo._id}
            product_mainInfo={mainInfo}
          />
        ))}
      </StyledGroupProductCard>
    </>
  );
}
