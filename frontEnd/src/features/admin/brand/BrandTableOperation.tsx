import { SortBy, TableOperation } from "@/components";
import { KEY_QUERY } from "@/constant";
import Search from "antd/es/input/Search";
import { useSearchParams } from "react-router-dom";

export default function BrandTableOperation() {
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
          { value: "brand_name-asc", label: "Sort by brand name (A-Z)" },
          { value: "brand_name-desc", label: "Sort by brand name (Z-A)" },
          { value: "brand_origin-asc", label: "Sort by brand origin (A-Z)" },
          { value: "brand_origin-desc", label: "Sort by brand origin (Z-A)" },
        ]}
      />
      <div>
        <Search
          placeholder="Search brands"
          style={{ maxWidth: "20rem" }}
          onSearch={handlerSearchUser}
          allowClear={false}
        />
      </div>
    </TableOperation>
  );
}
