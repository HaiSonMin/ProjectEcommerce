import { Heading, Row, Button } from "@/components";
import { CouponTable, CouponTableOperation } from "@/features/admin/coupon";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}

const CouponTablePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Coupons</Heading>
        <CouponTableOperation />
      </Row>
      <Row>
        <CouponTable />
        <Button onClick={() => navigate("create")}>Add new Coupon</Button>
      </Row>
    </>
  );
};

export default CouponTablePage;
