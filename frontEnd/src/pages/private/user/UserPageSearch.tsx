import { useNavigate } from "react-router-dom";
import { Button, Heading, Row } from "@/components";
import { UserTable, UserTableOperation } from "@/features/admin/user";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}
const UserPageSearch = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row $type={Type.horizontal}>
        <Heading $as="h1">All Users Search</Heading>
        <UserTableOperation />
      </Row>
      <Row>
        <UserTable isSearch={true} />
      </Row>
    </>
  );
};

export default UserPageSearch;
