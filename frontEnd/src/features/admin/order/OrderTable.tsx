import { Menus, Spinner, Table, Pagination } from "@/components/shared";
import { IOrder } from "@/interfaces/models";
import OrderRow from "./OrderRow";
import UseOrderApi from "../../../apis-use/UserOrderApi";

export default function OrderTable() {
  const { isGettingOrders, metadata } = UseOrderApi.getAllOrder();

  console.log(metadata);

  if (isGettingOrders) return <Spinner />;

  return (
    <Menus>
      <Table columns="1.4fr 0.9fr 0.9fr 0.6fr 0.9fr 1fr 0.6fr">
        <Table.Header>
          <div>Users</div>
          <div>Products</div>
          <div>ValueOrder</div>
          <div>Dates</div>
          <div>Payment</div>
          <div>Status</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={metadata?.orders}
          render={(order: IOrder) => (
            <OrderRow order={order} key={order._id || Math.random() * 100000} />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalOrders} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
