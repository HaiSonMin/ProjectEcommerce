import {
  AddBrand,
  BrandTable,
  BrandTableOperation,
} from "@/features/admin/brand";
import { Heading, Row } from "@/components/shared";
import { useSearchParams } from "react-router-dom";
import { KEY_QUERY } from "@/constant";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}

const BrandPage = () => {
  const [searchParams] = useSearchParams();
  const isSearching = !!searchParams.get(KEY_QUERY.KEY_SEARCH);
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Brands</Heading>
        <BrandTableOperation />
      </Row>
      <Row>
        <BrandTable />
        {!isSearching && <AddBrand />}
      </Row>
    </>
  );
};

export default BrandPage;
