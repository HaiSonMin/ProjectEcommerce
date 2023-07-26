import { Filter, SortBy, TableOperation } from "@/components";
import InputSearch from "@/components/InputSearch";
import Search from "antd/es/input/Search";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function UserTableOperation() {
  const navigate = useNavigate();
  const handlerSearchUser = (value: string) => {
    if (value.length > 0) navigate(`/admin/user/search?keySearch=${value}`);
    else navigate(`/admin/user`);
  };

  return (
    <TableOperation>
      <Filter
        filterField={"status"}
        options={[
          {
            value: "all",
            label: "All User",
          },
          {
            value: "blocking",
            label: "User Blocking",
          },
          {
            value: "unBlocking",
            label: "User UnBlocking",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "user_role-asc",
            label: "Sort by user role(A-Z)",
          },
          {
            value: "user_role-desc",
            label: "Sort by user role(Z-A)",
          },
        ]}
      />
      <div>
        <Search
          placeholder="Search User"
          style={{ maxWidth: "30rem" }}
          onSearch={handlerSearchUser}
        />
      </div>
    </TableOperation>
  );
}
