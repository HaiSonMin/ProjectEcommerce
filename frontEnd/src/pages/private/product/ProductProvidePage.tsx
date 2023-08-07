import UseProductApi from "@/features/admin/product/UseProductApi";
import { ProductMainInfoForm } from "@/features/admin/product";
import { Spinner } from "@/components";

export default function ProductProvidePage() {
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById();

  if (isGettingProduct) return <Spinner />;

  return <ProductMainInfoForm product={product} />;
}
