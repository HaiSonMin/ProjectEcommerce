import { ProductForm } from "@/features/admin/product";
import UseProductApi from "@/features/admin/product/UseProductApi";

export default function ProductUpdatePage() {
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById();

  return <ProductForm productEdit={product} />;
}
