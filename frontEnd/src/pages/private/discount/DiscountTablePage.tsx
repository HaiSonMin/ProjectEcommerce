import { Heading, Row, Button } from "@/components/shared";
import {
  DiscountTable,
  DiscountTableOperation,
} from "@/features/admin/discount";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}

const DiscountTablePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">Table All Discounts</Heading>
        <DiscountTableOperation />
      </Row>
      <Row>
        <DiscountTable />
        <Button onClick={() => navigate("createDiscount")}>
          Add new discount
        </Button>
      </Row>
    </>
  );
};

export default DiscountTablePage;
