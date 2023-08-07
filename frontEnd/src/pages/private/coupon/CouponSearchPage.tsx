import { Heading, Row } from "@/components";
import { CouponTable, CouponTableOperation } from "@/features/admin/coupon";
enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const CouponSearchPage = () => {
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Users Search</Heading>
        <CouponTableOperation />
      </Row>
      <Row>
        <CouponTable isSearch={true} />
      </Row>
    </>
  );
};

export default CouponSearchPage;
