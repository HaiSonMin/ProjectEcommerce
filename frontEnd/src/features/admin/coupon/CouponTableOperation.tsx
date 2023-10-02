import { Filter, SortBy, TableOperation } from "@/components";
import { PATH_ADMIN } from "@/constant/path-router";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

export default function DiscountTableOperation() {
  const navigate = useNavigate();
  const handlerSearchUser = (value: string) => {
    if (value.length > 0)
      navigate(`/admin/${PATH_ADMIN.coupon}/search?keySearch=${value}`);
    else navigate(`/admin/${PATH_ADMIN.coupon}`);
  };
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
            value: "coupon_value-asc",
            label: "Sort by value (A-Z)",
          },
          {
            value: "coupon_value-desc",
            label: "Sort by value (A-Z)",
          },
          {
            value: "coupon_minimumOrderValue-asc",
            label: "Sort by minimum order value (A-Z)",
          },
          {
            value: "coupon_minimumOrderValue-desc",
            label: "Sort by minimum order value (Z-A)",
          },
          {
            value: "coupon_numberOfApplication-asc",
            label: "Sort by number of application (A-Z)",
          },
          {
            value: "coupon_numberOfApplication-desc",
            label: "Sort by number of application (Z-A)",
          },
        ]}
      />
      <div>
        <Search
          placeholder="Search coupon"
          style={{ maxWidth: "20rem" }}
          onSearch={handlerSearchUser}
        />
      </div>
    </TableOperation>
  );
}
