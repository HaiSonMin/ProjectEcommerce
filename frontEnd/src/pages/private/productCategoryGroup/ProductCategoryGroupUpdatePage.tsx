import { Spinner } from "@/components";
import { UseProductCategoryGroupApi } from "@/apis-use";
import { ProductCategoryGroupForm } from "@/features/admin/productCategoryGroup";

export default function ProductCategoryUpdatePage() {
  const { isGettingProductCategoryGroup, metadata: productCategoryGroup } =
    UseProductCategoryGroupApi.getCategoryGroupById();

  if (isGettingProductCategoryGroup) return <Spinner />;
  return (
    <ProductCategoryGroupForm productCategoryGroupEdit={productCategoryGroup} />
  );
}
