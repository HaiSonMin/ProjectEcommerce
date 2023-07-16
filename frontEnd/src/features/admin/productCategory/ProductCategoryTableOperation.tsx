import { SortBy, TableOperation } from "../../../components";

export default function ProductCategoryTableOperation() {
  return (
    <TableOperation>
      <SortBy
        options={[
          {
            value: "productCategory_name-asc",
            label: "Sort by product category(A-Z)",
          },
          {
            value: "productCategory_name-desc",
            label: "Sort by product category(Z-A)",
          },
        ]}
      />
    </TableOperation>
  );
}
