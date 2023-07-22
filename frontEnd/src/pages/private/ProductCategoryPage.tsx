import { Heading, Row } from "../../components";
import {
  ProductCategoryTable,
  AddProductCategory,
  ProductCategoryTableOperation,
} from "../../features/admin/productCategory";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductCategoryPage = () => {
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products Categories</Heading>
        <ProductCategoryTableOperation />
      </Row>
      <Row>
        <ProductCategoryTable />
        <AddProductCategory />
      </Row>
    </>
  );
};

export default ProductCategoryPage;
