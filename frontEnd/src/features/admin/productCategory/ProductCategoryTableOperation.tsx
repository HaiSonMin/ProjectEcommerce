import { SortBy, TableOperation } from "@/components";

export default function ProductCategoryTableOperation() {
  return (
    <TableOperation>
      <SortBy
        options={[
          {
            value: "ctime",
            label: "--- Select option sort ---",
          },
          {
            value: "productCategory_name-asc",
            label: "Sort by product category(A-Z)",
          },
          {
            value: "productCategory_name-desc",
            label: "Sort by product category(Z-A)",
          },
          {
            value: "productCategory_type-asc",
            label: "Sort by product type(A-Z)",
          },
          {
            value: "productCategory_type-desc",
            label: "Sort by product type(Z-A)",
          },
        ]}
      />
    </TableOperation>
  );
}
