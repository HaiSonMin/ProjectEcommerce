import {
  AddBrand,
  BrandTable,
  BrandTableOperation,
} from "../../features/admin/brand";
import { Heading, Row } from "../../components";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}

const BrandPage = () => {
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Brands</Heading>
        <BrandTableOperation />
      </Row>
      <Row>
        <BrandTable />
        <AddBrand />
      </Row>
    </>
  );
};

export default BrandPage;
