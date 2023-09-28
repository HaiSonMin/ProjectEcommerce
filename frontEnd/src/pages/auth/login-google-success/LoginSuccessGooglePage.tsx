import { useEffect } from "react";
import { UseAuthApi } from "@/apis-use";
import { SpinnerLogo } from "@/components";
import { useDispatch } from "react-redux";
import { ILocalStoreUser } from "@/helpers";
import { Navigate } from "react-router-dom";
import CONSTANT from "@/constant/value-constant";
import { setUser } from "@/storeReducer/public/userSlice";

export default function LoginGoogleSuccessPage() {
  const dispatch = useDispatch();
  const { isLoginGoogle, metadata } = UseAuthApi.loginGoogle();
  const userStorage: ILocalStoreUser = {
    userId: metadata?.user._id,
    userEmail: metadata?.user.user_email,
    userFullName: metadata?.user.user_fullName,
    userRole: metadata?.user.user_role,
  };
  localStorage.setItem(
    CONSTANT.USER_NAME_LOCAL_STORE,
    JSON.stringify(userStorage)
  );
  localStorage.setItem(
    CONSTANT.AT_NAME_LOCAL_STORE,
    JSON.stringify(metadata?.accessToken)
  );
  useEffect(() => {
    dispatch(setUser(userStorage));
  }, [isLoginGoogle]);
  if (isLoginGoogle) return <SpinnerLogo />;
  return <Navigate to={"/"} replace />;
}
