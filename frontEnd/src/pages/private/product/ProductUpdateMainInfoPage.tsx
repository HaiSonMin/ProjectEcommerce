import { IProductMainInfoType } from "featureTypes/IProductType";
import { Heading, Spinner } from "../../../components";
import {
  ProductMainInfo,
  ProductMainInfoForm,
} from "../../../features/admin/product";
import UseProductApi from "../../../features/admin/product/UseProductApi";
import { styled } from "styled-components";

const StyledGroupProductCard = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function ProductUpdateMainInfoPage() {
  const { isGettingProduct, metadata } = UseProductApi.getProductById();
  const productMainInfos: Array<IProductMainInfoType> =
    metadata?.product_mainInfo;
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
