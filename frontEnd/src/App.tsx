import { CONSTANT } from "@/utils";
import { PublicLayOut } from "@/pages/public";
import { Navigate, Route, Routes } from "react-router";
import {
  AdminLayout,
  UserPage,
  OrderPage,
  BrandPage,
  RatingPage,
  CouponPage,
  PaymentPage,
  SettingPage,
  ProductPage,
  CustomerPage,
  DiscountPage,
  QuestionPage,
  WishlistPage,
  InventoryPage,
  DashboardPage,
} from "@/pages/private";
import { Suspense, lazy } from "react";
import { Spinner } from "./components";

const UserTablePage = lazy(() => import("@/pages/private/user/UserTablePage"));
const UserSearchPage = lazy(
  () => import("@/pages/private/user/UserSearchPage")
);
const UserCreatePage = lazy(
  () => import("@/pages/private/user/UserCreatePage")
);
const CouponTablePage = lazy(
  () => import("@/pages/private/coupon/CouponTablePage")
);
const CouponSearchPage = lazy(
  () => import("@/pages/private/coupon/CouponSearchPage")
);
const CouponCreatePage = lazy(
  () => import("@/pages/private/coupon/CouponCreatePage")
);
const CouponEditPage = lazy(
  () => import("@/pages/private/coupon/CouponEditPage")
);

const DiscountTablePage = lazy(
  () => import("@/pages/private/discount/DiscountTablePage")
);
const DiscountEditPage = lazy(
  () => import("@/pages/private/discount/DiscountEditPage")
);
const DiscountCreatePage = lazy(
  () => import("@/pages/private/discount/DiscountCreatePage")
);
const DiscountAddProductsPage = lazy(
  () => import("@/pages/private/discount/DiscountAddProductsPage")
);

const ProductTablePage = lazy(
  () => import("@/pages/private/product/ProductTablePage")
);
const ProductCreatePage = lazy(
  () => import("@/pages/private/product/ProductCreatePage")
);
const ProductSearchPage = lazy(
  () => import("@/pages/private/product/ProductSearchPage")
);
const ProductProvidePage = lazy(
  () => import("@/pages/private/product/ProductProvidePage")
);
const ProductUpdateBasicPage = lazy(
  () => import("@/pages/private/product/ProductUpdateBasicPage")
);
const ProductUpdateMainInfoPage = lazy(
  () => import("@/pages/private/product/ProductUpdateMainInfoPage")
);
const ProductUpdateMainInfoDetail = lazy(
  () => import("@/pages/private/product/ProductUpdateMainInfoDetail")
);

const DemandPage = lazy(() => import("@/pages/private/demand/DemandPage"));
const DemandTablePage = lazy(
  () => import("@/pages/private/demand/DemandTablePage")
);
const DemandCreatePage = lazy(
  () => import("@/pages/private/demand/DemandCreatePage")
);
const DemandUpdatePage = lazy(
  () => import("@/pages/private/demand/DemandUpdatePage")
);

const ProductCategoryPage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryPage")
);
const ProductCategoryTablePage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryTablePage")
);
const ProductCategoryCreatePage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryCreatePage")
);
const ProductCategoryUpdatePage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryUpdatePage")
);

const OrderTablePage = lazy(
  () => import("@/pages/private/order/OrderTablePage")
);

const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const HomePage = lazy(() => import("@/pages/public/home/Homepage"));

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Layout of public */}
        <Route element={<Navigate replace to={"/"} />} />
        <Route path={"/"} element={<PublicLayOut />}>
          <Route path={CONSTANT.PATH_PUBLIC.home} element={<HomePage />} />
        </Route>

        {/* <Route element={<Navigate replace to={"/admin"} />} /> */}
        {/* Layout of private */}
        <Route path={CONSTANT.PATH_ADMIN.admin} element={<AdminLayout />}>
          <Route path={CONSTANT.PATH_ADMIN.brand} element={<BrandPage />} />

          <Route
            path={CONSTANT.PATH_ADMIN.productCategory}
            element={<ProductCategoryPage />}
          >
            <Route path="" element={<ProductCategoryTablePage />} />
            <Route path={"create"} element={<ProductCategoryCreatePage />} />
            <Route
              path={"update/:productCategoryId"}
              element={<ProductCategoryUpdatePage />}
            />
            S
          </Route>

          <Route path={CONSTANT.PATH_ADMIN.demand} element={<DemandPage />}>
            <Route path="" element={<DemandTablePage />} />
            <Route path={"create"} element={<DemandCreatePage />} />
            <Route path={"update/:demandId"} element={<DemandUpdatePage />} />
          </Route>

          <Route path={CONSTANT.PATH_ADMIN.user} element={<UserPage />}>
            <Route path="" element={<UserTablePage />} />
            <Route path={`search`} element={<UserSearchPage />} />
            <Route path={`createEmployees`} element={<UserCreatePage />} />
          </Route>

          <Route path={CONSTANT.PATH_ADMIN.order} element={<OrderPage />}>
            <Route path={""} element={<OrderTablePage />} />
          </Route>

          <Route path={CONSTANT.PATH_ADMIN.coupon} element={<CouponPage />}>
            <Route path="" element={<CouponTablePage />} />
            <Route path={`search`} element={<CouponSearchPage />} />
            <Route path={`create`} element={<CouponCreatePage />} />
            <Route path={`update/:couponId`} element={<CouponEditPage />} />
          </Route>

          <Route path={CONSTANT.PATH_ADMIN.discount} element={<DiscountPage />}>
            <Route path={``} element={<DiscountTablePage />} />
            <Route path={`create`} element={<DiscountCreatePage />} />
            <Route path={`update/:discountId`} element={<DiscountEditPage />} />
            <Route
              path={`addProduct/:discountId`}
              element={<DiscountAddProductsPage />}
            />
          </Route>

          <Route path={CONSTANT.PATH_ADMIN.rating} element={<RatingPage />} />
          <Route path={CONSTANT.PATH_ADMIN.setting} element={<SettingPage />} />
          <Route path={CONSTANT.PATH_ADMIN.payment} element={<PaymentPage />} />
          <Route path={CONSTANT.PATH_ADMIN.product} element={<ProductPage />}>
            <Route path={``} element={<ProductTablePage />} />
            <Route path={`search`} element={<ProductSearchPage />} />
            <Route path={`create`} element={<ProductCreatePage />} />
            <Route
              path={`provideInfo/:productId`}
              element={<ProductProvidePage />}
            />
            <Route
              path={`updateBasic/:productId`}
              element={<ProductUpdateBasicPage />}
            />
            <Route
              path={`updateMainInfo/:productId`}
              element={<ProductUpdateMainInfoPage />}
            />
            <Route
              path={`updateMainInfoDetail/:productId`}
              element={<ProductUpdateMainInfoDetail />}
            />
          </Route>

          <Route
            path={CONSTANT.PATH_ADMIN.customer}
            element={<CustomerPage />}
          />
          <Route
            path={CONSTANT.PATH_ADMIN.question}
            element={<QuestionPage />}
          />
          <Route
            path={CONSTANT.PATH_ADMIN.wishlist}
            element={<WishlistPage />}
          />

          <Route
            path={CONSTANT.PATH_ADMIN.dashboard}
            element={<DashboardPage />}
          />
          <Route
            path={CONSTANT.PATH_ADMIN.inventory}
            element={<InventoryPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
