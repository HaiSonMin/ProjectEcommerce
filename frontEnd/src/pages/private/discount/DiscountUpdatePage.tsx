import { Spinner } from "@/components";
import { UseDiscountApi } from "@/apis-use";
import DiscountForm from "@/features/admin/discount/DiscountForm";

export default function DiscountEditPage() {
  const { isGettingDiscount, metadata } = UseDiscountApi.getOneDiscount();
  if (isGettingDiscount) return <Spinner />;
  return <DiscountForm discountEdit={metadata} />;
}
