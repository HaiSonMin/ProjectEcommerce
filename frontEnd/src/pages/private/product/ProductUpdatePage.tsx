import { Spinner } from "@/components";
import { UseProductApi } from "@/apis-use";
import { ProductForm } from "@/features/admin/product";

export default function ProductUpdatePage() {
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById();
  console.log(product);
  if (isGettingProduct) return <Spinner />;
  return <ProductForm productEdit={product} />;
}
