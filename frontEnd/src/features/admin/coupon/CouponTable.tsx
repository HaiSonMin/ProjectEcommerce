import CouponRow from "./CouponRow";
import UseCouponApi from "./UseCouponApi";
import { ICoupon } from "@/interfaces";
import { Menus, Spinner, Table, Pagination } from "@/components";

export default function CouponTable() {
  const { isGettingCoupons, metadata } = UseCouponApi.getAllCoupons();

  console.log(metadata);

  if (isGettingCoupons) return <Spinner />;

  return (
    <Menus>
      <Table columns="1.2fr 0.9fr 0.6fr 1.2fr 1fr 0.6fr">
        <Table.Header>
          <div>Name</div>
          <div>Type</div>
          <div>Value</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={metadata?.coupons}
          render={(coupon: ICoupon) => (
            <CouponRow
              coupon={coupon}
              key={coupon._id || Math.floor(Math.random() * 10000000)}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalCoupons} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
