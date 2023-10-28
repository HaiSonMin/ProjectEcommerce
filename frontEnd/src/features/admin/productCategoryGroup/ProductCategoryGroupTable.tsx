import { useEffect } from "react";
import { VALUE_CONSTANT } from "@/constant";
import { useSearchParams } from "react-router-dom";
import { IProductCategoryGroup } from "@/interfaces/models";
import { UseProductCategoryGroupApi } from "@/apis-use";
import { Menus, Pagination, Spinner, Table } from "@/components/shared";
import ProductCategoryGroupRow from "./ProductCategoryGroupRow";

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
