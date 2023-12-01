import { useEffect } from 'react';
import { UseAuthApi } from '@/apis-use';
import { SpinnerLogo } from '@/components/shared';
import { useDispatch } from 'react-redux';
import { ILocalStoreUser } from '@/interfaces/shared';
import { Navigate } from 'react-router-dom';
import { setUser } from '@/storeReducer/public/userSlice';
import { WEB_STORE_NAME } from '@/constant';

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
    WEB_STORE_NAME.USER_NAME_LOCAL_STORE,
    JSON.stringify(userStorage)
  );
  localStorage.setItem(
    WEB_STORE_NAME.AT_NAME_LOCAL_STORE,
    JSON.stringify(metadata?.accessToken)
  );
  useEffect(() => {
    dispatch(setUser(userStorage));
  }, [isLoginGoogle]);
  if (isLoginGoogle) return <SpinnerLogo />;
  return <Navigate to={'/'} replace />;
}
