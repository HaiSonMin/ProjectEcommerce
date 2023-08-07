import { Outlet, useNavigate } from "react-router-dom";
import { Button, Heading, Row } from "@/components";
import { UserTable, UserTableOperation } from "@/features/admin/user";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const UserDisplayPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Users</Heading>
        <UserTableOperation />
      </Row>
      <Row>
        <UserTable />
        <Button onClick={() => navigate("createEmployees")}>
          Add new employees
        </Button>
      </Row>
    </>
  );
};

export default UserDisplayPage;
