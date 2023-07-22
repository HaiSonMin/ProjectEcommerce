import UseProductApi from "../../../features/admin/product/UseProductApi";
import { Heading, Spinner } from "../../../components";
import { ProductUpdateBasic } from "../../../features/admin/product";

export default function ProductUpdateBasicPage() {
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById();
  return (
    <>
      <Heading $as="h1">Update Product Basic</Heading>
      {isGettingProduct ? (
        <Spinner />
      ) : (
        <ProductUpdateBasic product={product} />
      )}
    </>
  );
}
