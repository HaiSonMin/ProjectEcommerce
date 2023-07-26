import { Spinner } from "@/components";
import DiscountForm from "@/features/admin/discount/DiscountForm";
import UseDiscountApi from "@/features/admin/discount/UseDiscountApi";

export default function DiscountEditPage() {
  const { isGettingDiscount, metadata } = UseDiscountApi.getOneDiscount();
  if (isGettingDiscount) return <Spinner />;
  console.log(metadata);
  return <DiscountForm discountEdit={metadata} />;
}
