import { UseUserApi } from "@/apis-use";
import CONSTANT from "@/constant/value-constant";
import { useEffect } from "react";
import { EnumRoleUser } from "@/enum";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectPrivateRouter() {
  const { isGettingUser, metadata } = UseUserApi.getUser();
  useEffect(() => {}, [isGettingUser]);
  if (!metadata) return <Navigate to={"/"} replace={true} />;
  if (metadata.user_role !== EnumRoleUser.ADMIN)
    return <Navigate to={"/"} replace={true} />;
  else return <Outlet />;
}
