import { SortBy, TableOperation } from "../../../components";

export default function BrandTableOperation() {
  return (
    <TableOperation>
      <SortBy
        options={[
          { value: "brand_name-asc", label: "Sort by brand name (A-Z)" },
          { value: "brand_name-desc", label: "Sort by brand name (Z-A)" },
        ]}
      />
    </TableOperation>
  );
}
