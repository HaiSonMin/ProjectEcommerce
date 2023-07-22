import { ProductRow } from "./";
import UseProductApi from "./UseProductApi";
import { Menus, Pagination, Spinner, Table } from "../../../components";
import { IProductType } from "featureTypes";

export default function ProductTable() {
  const { isGettingProducts, metadata } = UseProductApi.getAllProducts();

  if (isGettingProducts) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.5fr 1.1fr 0.8fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div>Thumb</div>
          <div>Name</div>
          <div>Brand</div>
          <div>Category</div>
          <div>Price</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={metadata?.products}
          render={(product: IProductType) => (
            <ProductRow key={product._id} product={product} />
          )}
        />
        <Table.Footer>
          <Pagination countItems={1} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
