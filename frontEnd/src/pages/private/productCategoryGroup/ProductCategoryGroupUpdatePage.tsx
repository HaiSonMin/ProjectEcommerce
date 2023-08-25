import { Spinner } from "@/components";
import { ProductCategoryGroupForm } from "@/features/admin/productCategoryGroup";
import UseProductCategoryGroupApi from "@/features/admin/productCategoryGroup/UseProductCategoryGroupApi";

export default function ProductCategoryUpdatePage() {
  const { isGettingProductCategoryGroup, metadata: productCategoryGroup } =
    UseProductCategoryGroupApi.getCategoryGroupById();

  if (isGettingProductCategoryGroup) return <Spinner />;
  return (
    <ProductCategoryGroupForm productCategoryGroupEdit={productCategoryGroup} />
  );
}
