import {
  ProductTable,
  ProductTableOperation,
} from "../../../features/admin/product";
import { Button, Heading, Row } from "../../../components";
import { Link, useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products</Heading>
        <ProductTableOperation />
      </Row>
      <Row>
        <ProductTable />
        <Button onClick={() => navigate("createProduct")}>
          Add new product
        </Button>
      </Row>
    </>
  );
};

export default ProductPage;
