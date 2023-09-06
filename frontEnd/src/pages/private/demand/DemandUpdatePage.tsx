import { Spinner } from "@/components";
import { DemandForm } from "@/features/admin/demand";
import UseDemandApi from "@/features/admin/demand/UseDemandApi";

export default function ProductCategoryUpdatePage() {
  const { isGettingDemand, metadata: demand } = UseDemandApi.getDemandById();

  if (isGettingDemand) return <Spinner />;
  return <DemandForm demandEdit={demand} />;
}
