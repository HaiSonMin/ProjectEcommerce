import { Menus, Spinner, Table, Pagination } from "@/components";
import { IDiscount } from "@/interfaces";
import DiscountRow from "./DiscountRow";
import { UseDiscountApi } from "@/apis-use";

export default function DiscountTable() {
  const { isGettingDiscounts, metadata } = UseDiscountApi.getAllDiscount();

  if (isGettingDiscounts) return <Spinner />;

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
          data={metadata?.discounts}
          render={(discount: IDiscount) => (
            <DiscountRow
              discount={discount}
              key={discount._id || Math.random() * 100000}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalDiscounts} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
