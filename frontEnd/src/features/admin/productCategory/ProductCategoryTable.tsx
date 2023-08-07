import { CONSTANT } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { IProductCategory } from "@/interfaces";
import ProductCategoryRow from "./ProductCategoryRow";
import UseProductCategoryApi from "./UseProductCategoryApi";
import { Menus, Pagination, Spinner, Table } from "@/components";
import { useEffect } from "react";

export default function ProductCategoryTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isGettingProductCategories, metadata } =
    UseProductCategoryApi.getAllCategories();

  useEffect(() => {
    searchParams.set("limit", String(CONSTANT.LIMIT_PAGE));
    setSearchParams(searchParams);
  }, []);

  if (isGettingProductCategories) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 2fr 1.5fr 0.4fr">
        <Table.Header>
          <div>Avatar</div>
          <div>Category Name</div>
          <div>Category Type</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={metadata?.productCategories}
          render={(productCategory: IProductCategory) => (
            <ProductCategoryRow
              key={productCategory._id}
              productCategory={productCategory}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalProductCategories} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
