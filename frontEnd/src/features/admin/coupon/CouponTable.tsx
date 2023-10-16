import CouponRow from "./CouponRow";
import { ICoupon } from "@/interfaces";
import { Menus, Spinner, Table, Pagination } from "@/components/shared";
import { UseCouponApi } from "@/apis-use";

interface IProps {
  isSearch?: boolean;
}

export default function CouponTable(props: IProps) {
  let data: any, isGetting: boolean;
  if (!props?.isSearch) {
    const { isGettingCoupons, metadata } = UseCouponApi.getAllCoupons();
    data = metadata;
    isGetting = isGettingCoupons;
  } else {
    const { isSearchingCoupons, metadata } = UseCouponApi.searchCoupons();
    data = metadata;
    isGetting = isSearchingCoupons;
  }

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 0.5fr 0.9fr 1fr 1fr 1.5fr 1fr 0.6fr">
        <Table.Header>
          <div>Name</div>
          <div>Type</div>
          <div>Value</div>
          <div>Minimum Order</div>
          <div>Number Coupon</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={data?.coupons}
          render={(coupon: ICoupon) => (
            <CouponRow
              coupon={coupon}
              key={coupon._id || Math.floor(Math.random() * 10000000)}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={data?.totalCoupons} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
