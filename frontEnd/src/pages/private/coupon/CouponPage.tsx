import { Heading, Row, Button } from "@/components";
import { CouponTable, CouponTableOperation } from "@/features/admin/coupon";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}

const CouponPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">Table All Coupons</Heading>
        <CouponTableOperation />
      </Row>
      <Row>
        <CouponTable />
        <Button onClick={() => navigate("createCoupon")}>Add new Coupon</Button>
      </Row>
    </>
  );
};

export default CouponPage;
