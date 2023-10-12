import { SortBy, TableOperation } from "@/components/shared";
import { KEY_QUERY } from "@/constant";
import Search from "antd/es/input/Search";
import { useSearchParams } from "react-router-dom";

export default function ProductCategoryTableOperation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlerSearchUser = (value: string) => {
    if (value.length > 0) searchParams.set(KEY_QUERY.KEY_SEARCH, value);
    else searchParams.delete(KEY_QUERY.KEY_SEARCH);
    setSearchParams(searchParams);
  };

  return (
    <TableOperation>
      <SortBy
        options={[
          {
            value: "ctime",
            label: "--- Select option sort ---",
          },
          {
            value: "demand_name-asc",
            label: "Sort by demand name(A-Z)",
          },
          {
            value: "demand_name-desc",
            label: "Sort by demand name(Z-A)",
          },
          {
            value: "productCategory_group.productCategoryGroup_name-asc",
            label: "Sort by category group(A-Z)",
          },
          {
            value: "productCategory_group.productCategoryGroup_name-desc",
            label: "Sort by category group(Z-A)",
          },
        ]}
      />
      <div>
        <Search
          placeholder="Search demands"
          style={{ maxWidth: "20rem" }}
          onSearch={handlerSearchUser}
          allowClear={false}
        />
      </div>
    </TableOperation>
  );
}
