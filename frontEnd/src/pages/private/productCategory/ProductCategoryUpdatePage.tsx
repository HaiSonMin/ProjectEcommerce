import { Spinner } from "@/components";
import { ProductCategoryForm } from "@/features/admin/productCategory";
import UseProductCategoryApi from "@/features/admin/productCategory/UseProductCategoryApi";

export default function ProductCategoryUpdatePage() {
  const { isGettingProductCategory, metadata: productCategory } =
    UseProductCategoryApi.getCategoryById();

  if (isGettingProductCategory) return <Spinner />;
  return <ProductCategoryForm productCategoryEdit={productCategory} />;
}
