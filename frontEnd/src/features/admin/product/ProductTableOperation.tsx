import { Filter, SortBy, TableOperation } from "../../../components";

export default function ProductTableOperation() {
  return (
    <TableOperation>
      <Filter
        filterField={"numericFilters"}
        options={[
          {
            value: "product_quantity[gte]0",
            label: "Get All Product",
          },
          {
            value: "product_quantity[gt]0",
            label: "Get Product Available",
          },
          {
            value: "product_quantity[eq]0",
            label: "Get Product Unavailable",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "product_price-asc",
            label: "Sort by product price(A-Z)",
          },
          {
            value: "product_price-desc",
            label: "Sort by product price(Z-A)",
          },
          {
            value: "product_quantity-asc",
            label: "Sort by product quantity(A-Z)",
          },
          {
            value: "product_quantity-desc",
            label: "Sort by product quantity(Z-A)",
          },
          {
            value: "product_sold-asc",
            label: "Sort by product sold(A-Z)",
          },
          {
            value: "product_sold-desc",
            label: "Sort by product sold(Z-A)",
          },
          {
            value: "product_ram-asc",
            label: "Sort by product ram(A-Z)",
          },
          {
            value: "product_ram-desc",
            label: "Sort by product ram(Z-A)",
          },
        ]}
      />
    </TableOperation>
  );
}
