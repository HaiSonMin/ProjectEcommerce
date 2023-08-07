import { ProductTable, ProductTableOperation } from "@/features/admin/product";
import { Heading, Row } from "@/components";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductTablePage = () => {
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products</Heading>
        <ProductTableOperation />
      </Row>
      <Row>
        <ProductTable isSearch={true} />
      </Row>
    </>
  );
};

export default ProductTablePage;
