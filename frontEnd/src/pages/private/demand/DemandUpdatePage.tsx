import { Spinner } from "@/components";
import { ProductCategoryForm } from "@/features/admin/productCategory";
import UseDemandApi from "@/features/admin/demand/UseDemandApi";
import { DemandForm } from "@/features/admin/demand";

export default function ProductCategoryUpdatePage() {
  const { isGettingDemand, metadata: demand } = UseDemandApi.getDemandById();

  if (isGettingDemand) return <Spinner />;
  return <DemandForm demandEdit={demand} />;
}
