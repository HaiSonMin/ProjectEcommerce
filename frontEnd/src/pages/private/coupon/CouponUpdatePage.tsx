import { Spinner } from "@/components/shared";
import { UseCouponApi } from "@/apis-use";
import { CouponForm } from "@/features/admin/coupon";

export default function CouponEditPage() {
  const { isGettingCoupon, metadata } = UseCouponApi.getOneCoupon();
  if (isGettingCoupon) return <Spinner />;
  return <CouponForm couponEdit={metadata} />;
}
