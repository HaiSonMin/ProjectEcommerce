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
            value: "productCategoryGroup_name-asc",
            label: "Sort by product category(A-Z)",
          },
          {
            value: "productCategoryGroup_name-desc",
            label: "Sort by product category(Z-A)",
          },
        ]}
      />
    </TableOperation>
  );
}
