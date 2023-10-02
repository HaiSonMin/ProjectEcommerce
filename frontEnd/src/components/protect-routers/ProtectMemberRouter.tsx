import { EnumRoleUser } from "@/enum";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "@/storeReducer/public/userSlice";

export default function ProtectMemberRouter() {
  const { userRole } = useSelector(getUser);
  if (!userRole || userRole !== EnumRoleUser.USER)
    return <Navigate to={"/"} replace={true} />;
  return <Outlet />;
}
