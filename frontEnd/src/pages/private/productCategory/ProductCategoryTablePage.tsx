import { Heading, Row, Button } from "@/components/shared";
import { KEY_QUERY } from "@/constant";
import {
  ProductCategoryTable,
  ProductCategoryTableOperation,
} from "@/features/admin/productCategory";
import { useNavigate, useSearchParams } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductCategoryTablePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSearching = !!searchParams.get(KEY_QUERY.KEY_SEARCH);
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products Categories</Heading>
        <ProductCategoryTableOperation />
      </Row>
      <Row>
        <ProductCategoryTable />
        {!isSearching && (
          <Button onClick={() => navigate("create")}>
            Add new product category
          </Button>
        )}
      </Row>
    </>
  );
};

export default ProductCategoryTablePage;
