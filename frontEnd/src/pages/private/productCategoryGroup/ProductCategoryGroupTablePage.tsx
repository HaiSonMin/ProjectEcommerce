import { Heading, Row, Button } from "@/components/shared";
import {
  ProductCategoryGroupTable,
  ProductCategoryGroupTableOperation,
} from "@/features/admin/productCategoryGroup";
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
        <Heading $as="h1">All Products Categories Group</Heading>
        <ProductCategoryGroupTableOperation />
      </Row>
      <Row>
        <ProductCategoryGroupTable />
        <Button onClick={() => navigate("create")}>
          Add new product category group
        </Button>
      </Row>
    </>
  );
};

export default ProductCategoryTablePage;
