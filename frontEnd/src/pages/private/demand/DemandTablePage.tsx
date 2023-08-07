import { Heading, Row, Button } from "@/components";
import {
  DemandTable,
  DemandTableOperation,
} from "@/features/admin/demand";
import { useNavigate } from "react-router-dom";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const DemandTablePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Products Categories</Heading>
        <DemandTableOperation />
      </Row>
      <Row>
        <DemandTable />
        <Button onClick={() => navigate("create")}>
          Add new demand
        </Button>
      </Row>
    </>
  );
};

export default DemandTablePage;
