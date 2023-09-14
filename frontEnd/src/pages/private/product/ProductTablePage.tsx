import { ProductTable, ProductTableOperation } from "@/features/admin/product";
import { Button, Heading, Row } from "@/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KEY_QUERY } from "@/constant";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const ProductTablePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSearching = !!searchParams.get(KEY_QUERY.KEY_SEARCH);
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products</Heading>
        <ProductTableOperation />
      </Row>

      <ProductTable />
      {!isSearching && (
        <Button onClick={() => navigate("create")}>Add new product</Button>
      )}
    </>
  );
};

export default ProductTablePage;
