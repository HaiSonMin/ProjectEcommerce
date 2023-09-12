import { Spinner } from "@/components";
import { ProductForm } from "@/features/admin/product";
import UseProductApi from "@/features/admin/product/UseProductApi";

export default function ProductUpdatePage() {
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById();
  console.log(product);
  if (isGettingProduct) return <Spinner />;
  return <ProductForm productEdit={product} />;
}
