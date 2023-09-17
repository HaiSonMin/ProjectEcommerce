import { PATH_ADMIN } from "@/constant";
import CONSTANT from "@/constant/value-constant";
import { getUser } from "@/storeReducer/userSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouter() {
  const user = useSelector(getUser);
  if (!user.userRole || user.userRole === CONSTANT.ROLE_USER["USER"])
    return <Navigate to={"/"} replace={true} />;
  return <Outlet />;
}
