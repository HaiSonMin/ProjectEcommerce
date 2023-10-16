import { useSearchParams } from "react-router-dom";
import { IProductCategory } from "@/interfaces";
import ProductCategoryRow from "./ProductCategoryRow";
import { Menus, Pagination, Spinner, Table } from "@/components/shared";
import { useEffect } from "react";
import { KEY_QUERY, VALUE_CONSTANT } from "@/constant";
import { UseProductCategoryApi } from "@/apis-use";

interface IProps {
  isSearch?: boolean;
}

export default function ProductCategoryTable({ isSearch }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSearching = !!searchParams.get(KEY_QUERY.KEY_SEARCH);

  useEffect(() => {
    searchParams.set("limit", String(VALUE_CONSTANT.LIMIT_PAGE));
    setSearchParams(searchParams);
  }, []);

  let data:
      | {
          totalProductCategories: number;
          productCategoriesPerPage: number;
          productCategories: Array<IProductCategory>;
        }
      | undefined,
    isGetting: boolean;
  if (!isSearching) {
    const { isGettingProductCategories, metadata } =
      UseProductCategoryApi.getAllCategories();
    data = metadata;
    isGetting = isGettingProductCategories;
  } else {
    const { isSearchingProductCategories, metadata } =
      UseProductCategoryApi.searchCategories();
    data = metadata;
    isGetting = isSearchingProductCategories;
  }

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 1.5fr 1.2fr 1.5fr 0.4fr">
        <Table.Header>
          <div>Avatar</div>
          <div>Category Name</div>
          <div>Category Type</div>
          <div>Category Group</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={data?.productCategories}
          render={(productCategory: IProductCategory) => (
            <ProductCategoryRow
              key={productCategory._id}
              productCategory={productCategory}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={data?.totalProductCategories} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
