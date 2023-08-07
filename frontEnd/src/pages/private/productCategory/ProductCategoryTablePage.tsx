import { Heading, Row, Button } from "@/components";
import {
  ProductCategoryTable,
  ProductCategoryTableOperation,
} from "@/features/admin/productCategory";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductCategoryTablePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products Categories</Heading>
        <ProductCategoryTableOperation />
      </Row>
      <Row>
        <ProductCategoryTable />
        <Button onClick={() => navigate("create")}>
          Add new product category
        </Button>
      </Row>
    </>
  );
};

export default ProductCategoryTablePage;
