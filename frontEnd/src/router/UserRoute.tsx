import { Suspense, lazy } from "react";
import { Spinner } from "@/components/shared";
import { CONSTANT } from "@/utils";
import { Route } from "react-router-dom";

const UserPage = lazy(() => import("@/pages/private/user/UserPage"));
const UserTablePage = lazy(() => import("@/pages/private/user/UserTablePage"));
const UserCreatePage = lazy(
  () => import("@/pages/private/user/UserCreatePage")
);
const UserSearchPage = lazy(
  () => import("@/pages/private/user/UserSearchPage")
);

export default function UserRoute() {
  return (
    <Route path={CONSTANT.PATH_ADMIN.user} element={<UserPage />}>
      <Route
        path=""
        element={
          <Suspense fallback={<Spinner />}>
            <UserTablePage />
          </Suspense>
        }
      />
      <Route
        path={`search`}
        element={
          <Suspense fallback={<Spinner />}>
            <UserSearchPage />
          </Suspense>
        }
      />
      <Route
        path={`createEmployees`}
        element={
          <Suspense fallback={<Spinner />}>
            <UserCreatePage />
          </Suspense>
        }
      />
    </Route>
  );
}
