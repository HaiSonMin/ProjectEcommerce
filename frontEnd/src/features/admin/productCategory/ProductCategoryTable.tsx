import { useSearchParams } from "react-router-dom";
import UseProductCategoryApi from "./UseProductCategoryApi";
import { sortObject } from "../../../utils";
import { Menus, Modal, Pagination, Spinner, Table } from "../../../components";
import ProductCategoryRow from "./ProductCategoryRow";
import { ProductCategoryType } from "featureTypes";

export default function ProductCategoryTable() {
  const [searchParams] = useSearchParams();
  const { isGettingProductCategory, metadata } =
    UseProductCategoryApi.useGetAllCategory();

  // Sort
  const sortByValue = searchParams.get("sort") || "created_at-asc";

  const sortedProductCategories = sortObject({
    data: metadata?.productCategories,
    sortValue: sortByValue,
  });

  if (isGettingProductCategory) return <Spinner />;
  console.log("sortedProductCategories::::", metadata);

  return (
    <Menus>
      <Table columns="1fr 1.2fr 0.2fr">
        <Table.Header>
          <div>Avatar Category</div>
          <div>Category Name</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedProductCategories}
          render={(productCategory: ProductCategoryType) => (
            <ProductCategoryRow
              key={productCategory._id}
              productCategory={productCategory}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata.totalProductCategories} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
