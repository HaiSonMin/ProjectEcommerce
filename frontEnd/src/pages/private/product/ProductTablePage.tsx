import { ProductTable, ProductTableOperation } from "@/features/admin/product";
import { Button, Heading, Row } from "@/components";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductTablePage = () => {
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

export default ProductTablePage;
