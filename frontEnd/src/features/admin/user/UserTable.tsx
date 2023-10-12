import UserRow from "./UserRow";
import { IUser } from "@/interfaces";
import { UseAdminApi } from "@/apis-use";
import { Menus, Spinner, Table, Pagination } from "@/components/shared";

interface IProps {
  isSearch?: boolean;
}

export default function UserTable(props: IProps) {
  let data: any, isGetting: boolean;
  if (!props?.isSearch) {
    const { isGettingUsers, metadata } = UseAdminApi.getAllUser();
    data = metadata;
    isGetting = isGettingUsers;
  } else {
    const { isSearchingUsers, metadata } = UseAdminApi.searchUsers();
    data = metadata;
    isGetting = isSearchingUsers;
  }

  console.log(data, props.isSearch);

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns="1.2fr 1.2fr 0.5fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div>Information</div>
          <div>UserName</div>
          <div>Role</div>
          <div>PhoneNumber</div>
          <div>Status</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={data?.users}
          render={(user: IUser) => (
            <UserRow user={user} key={user._id || Math.random() * 100000} />
          )}
        />
        <Table.Footer>
          <Pagination countItems={data?.totalUsers} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
