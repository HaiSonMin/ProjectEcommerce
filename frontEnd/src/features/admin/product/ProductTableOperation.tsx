import { Filter, SortBy, TableOperation } from "@/components/shared";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

export default function ProductTableOperation() {
  const navigate = useNavigate();
  const handlerSearchProduct = (value: string) => {
    if (value.length > 0) navigate(`/admin/product/search?keySearch=${value}`);
    else navigate(`/admin/user`);
  };

  return (
    <TableOperation>
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
      <div>
        <Search
          placeholder="Search product"
          style={{ maxWidth: "30rem" }}
          onSearch={handlerSearchProduct}
        />
      </div>
    </TableOperation>
  );
}
