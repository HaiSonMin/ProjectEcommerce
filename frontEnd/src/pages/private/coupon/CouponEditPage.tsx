import { Spinner } from "@/components";
import { CouponForm } from "@/features/admin/coupon";
import UseCouponApi from "@/features/admin/coupon/UseCouponApi";

export default function CouponEditPage() {
  const { isGettingCoupon, metadata } = UseCouponApi.getOneCoupon();
  if (isGettingCoupon) return <Spinner />;
  return <CouponForm couponEdit={metadata} />;
}
