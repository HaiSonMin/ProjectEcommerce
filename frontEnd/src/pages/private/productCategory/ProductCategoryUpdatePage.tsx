import { Spinner } from "@/components/shared";
import { UseProductCategoryApi } from "@/apis-use";
import { ProductCategoryForm } from "@/features/admin/productCategory";

export default function ProductCategoryUpdatePage() {
  const { isGettingProductCategory, metadata: productCategory } =
    UseProductCategoryApi.getCategoryById();

  if (isGettingProductCategory) return <Spinner />;
  return <ProductCategoryForm productCategoryEdit={productCategory} />;
}
