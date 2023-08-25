import { useSearchParams } from "react-router-dom";
import { IProductCategoryGroup } from "@/interfaces";
import UseProductCategoryGroupApi from "./UseProductCategoryGroupApi";
import { Menus, Pagination, Spinner, Table } from "@/components";
import { useEffect } from "react";
import ProductCategoryGroupRow from "./ProductCategoryGroupRow";
import { VALUE_CONSTANT } from "@/constant";

export default function ProductCategoryTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isGettingProductCategoriesGroup, metadata } =
    UseProductCategoryGroupApi.getAllCategoriesGroup();

  useEffect(() => {
    searchParams.set("limit", String(VALUE_CONSTANT.LIMIT_PAGE));
    setSearchParams(searchParams);
  }, []);

  if (isGettingProductCategoriesGroup) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 1.5fr 0.4fr">
        <Table.Header>
          <div>Category Group Avatar</div>
          <div>Category Group Name</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={metadata?.productCategoriesGroup}
          render={(productCategoryGroup: IProductCategoryGroup) => (
            <ProductCategoryGroupRow
              key={productCategoryGroup._id}
              productCategoryGroup={productCategoryGroup}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalProductCategoriesGroup} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
