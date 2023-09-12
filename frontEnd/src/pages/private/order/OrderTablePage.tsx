import { Heading, Row } from "@/components";
import { OrderTable, OrderTableOperation } from "@/features/admin/order";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const OrderTablePage = () => {
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Orders</Heading>
        <OrderTableOperation />
      </Row>
      <Row>
        <OrderTable />
      </Row>
    </>
  );
};

export default OrderTablePage;