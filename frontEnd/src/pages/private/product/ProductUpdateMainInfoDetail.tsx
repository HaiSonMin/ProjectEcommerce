import { Spinner } from "@/components";
import { ProductMainInfoForm } from "@/features/admin/product";
import UseProductApi from "@/features/admin/product/UseProductApi";
export default function ProductUpdateMainInfoDetail() {
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById();
  const {
    isGettingProduct: isGettingProductMainInfo,
    metadata: product_mainInfo,
  } = UseProductApi.getProductMainInfoById();

  const isWorkingGetting = isGettingProduct || isGettingProductMainInfo;

  if (isWorkingGetting) return <Spinner />;

  return (
    <ProductMainInfoForm
      product={product}
      product_mainInfo={product_mainInfo}
    />
  );
}
