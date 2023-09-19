import Search from "antd/es/input/Search";
import { SortBy, TableOperation } from "@/components";
import { KEY_QUERY, PATH_ADMIN } from "@/constant";
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
            value: "productCategory_name-asc",
            label: "Sort by product category(A-Z)",
          },
          {
            value: "productCategory_name-desc",
            label: "Sort by product category(Z-A)",
          },
          {
            value: "productCategoryGroup_name-asc,productCategory_type-asc",
            label: "Sort by product group(A-Z)",
          },
          {
            value: "productCategoryGroup_name-desc,productCategory_type-asc",
            label: "Sort by product group(Z-A)",
          },
        ]}
      />
      <div>
        <Search
          placeholder="Search categories"
          style={{ maxWidth: "20rem" }}
          onSearch={handlerSearchUser}
          allowClear={false}
        />
      </div>
    </TableOperation>
  );
}
