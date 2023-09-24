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
  const dataLocalStorageUser: ILocalStoreUser = {
    userId: metadata?.user._id,
    userEmail: metadata?.user.user_email,
    userFullName: metadata?.user.user_fullName,
    accessToken: metadata?.accessToken,
  };
  localStorage.setItem(
    CONSTANT.USER_TOKEN_NAME,
    JSON.stringify(dataLocalStorageUser)
  );
  useEffect(() => {
    dispatch(
      setUser({
        userId: dataLocalStorageUser.userId,
        userEmail: dataLocalStorageUser.userEmail,
        userFullName: dataLocalStorageUser.userFullName,
        accessToken: dataLocalStorageUser.accessToken,
      })
    );
  }, [isLoginGoogle]);
  if (isLoginGoogle) return <SpinnerLogo />;
  return <Navigate to={"/"} replace />;
}
