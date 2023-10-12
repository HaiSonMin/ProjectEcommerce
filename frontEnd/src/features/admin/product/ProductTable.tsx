import { ProductRow } from "./";
import { IProduct } from "@/interfaces";
import { UseProductApi } from "@/apis-use";
import { Menus, Pagination, Spinner, Table } from "@/components/shared";

interface Iprops {
  isSearch?: boolean;
}

export default function ProductTable(props: Iprops) {
  let data: any, isGetting: boolean;
  if (!props?.isSearch) {
    const { isGettingProducts, metadata } = UseProductApi.getAllProducts();
    data = metadata;
    isGetting = isGettingProducts;
  } else {
    const { isSearchingProducts, metadata } = UseProductApi.searchProducts();
    data = metadata;
    isGetting = isSearchingProducts;
  }

  console.log(data, props.isSearch);

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.5fr 1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 0.5fr">
        <Table.Header>
          <div>Thumb</div>
          <div>Name</div>
          <div>Brand</div>
          <div>Category</div>
          <div>Origin</div>
          <div>Price</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={data?.products}
          render={(product: IProduct) => (
            <ProductRow
              key={product._id || Math.random() * 100000}
              product={product}
            />
          )}
        />
        <Table.Footer>
          <Pagination countItems={1} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
