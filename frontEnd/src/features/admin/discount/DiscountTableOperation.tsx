import { Filter, SortBy, TableOperation } from "@/components";

export default function DiscountTableOperation() {
  return (
    <TableOperation>
      <Filter
        filterField={"status"}
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "available",
            label: "Available",
          },
          {
            value: "expired",
            label: "Expired",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "discount_value-asc",
            label: "Sort by discount value (A-Z)",
          },
          {
            value: "discount_value-desc",
            label: "Sort by discount value (A-Z)",
          },
        ]}
      />
    </TableOperation>
  );
}
