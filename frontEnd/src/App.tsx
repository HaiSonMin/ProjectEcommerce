import { PATH_ADMIN, PATH_USER } from "@/constant";
import { Suspense, lazy, useEffect } from "react";
import { ProtectPrivateRouter } from "@/components/protect-routers";
import { SpinnerLogo } from "@/components";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  UserPage,
  OrderPage,
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
  AdminPageLayout,
} from "@/pages/private";

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
const CouponCreatePage = lazy(
  () => import("@/pages/private/coupon/CouponCreatePage")
);
const CouponEditPage = lazy(
  () => import("@/pages/private/coupon/CouponUpdatePage")
);

const DiscountTablePage = lazy(
  () => import("@/pages/private/discount/DiscountTablePage")
);
const DiscountEditPage = lazy(
  () => import("@/pages/private/discount/DiscountUpdatePage")
);
const DiscountCreatePage = lazy(
  () => import("@/pages/private/discount/DiscountCreatePage")
);
const DiscountAddProductsPage = lazy(
  () => import("@/pages/private/discount/DiscountAddProductsPage")
);

const BrandPage = lazy(() => import("@/pages/private/brand/BrandPage"));
const BrandTablePage = lazy(
  () => import("@/pages/private/brand/BrandTablePage")
);

const ProductTablePage = lazy(
  () => import("@/pages/private/product/ProductTablePage")
);
const ProductCreatePage = lazy(
  () => import("@/pages/private/product/ProductCreatePage")
);
const ProductUpdatePage = lazy(
  () => import("@/pages/private/product/ProductUpdatePage")
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

const ProductCategoryGroupPage = lazy(
  () => import("@/pages/private/productCategoryGroup/ProductCategoryGroupPage")
);
const ProductCategoryGroupTablePage = lazy(
  () =>
    import("@/pages/private/productCategoryGroup/ProductCategoryGroupTablePage")
);
const ProductCategoryGroupCreatePage = lazy(
  () =>
    import(
      "@/pages/private/productCategoryGroup/ProductCategoryGroupCreatePage"
    )
);
const ProductCategoryGroupUpdatePage = lazy(
  () =>
    import(
      "@/pages/private/productCategoryGroup/ProductCategoryGroupUpdatePage"
    )
);

const PublicLayOut = lazy(() => import("@/pages/public/PublicLayOut"));
const ConfirmOTPPage = lazy(() => import("@/pages/auth/ConfirmOTPPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const GenerateOTPPage = lazy(() => import("@/pages/auth/GenerateOTPPage"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));
const LoginSuccessGooglePage = lazy(
  () => import("@/pages/auth/LoginSuccessGooglePage")
);

const OrderTablePage = lazy(
  () => import("@/pages/private/order/OrderTablePage")
);

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const HomePage = lazy(() => import("@/pages/public/home/Homepage"));

const ProductCategoryPageUser = lazy(
  () => import("@/pages/public/product/product-category/ProductCategoryPage")
);
const ProductDetailPageUser = lazy(
  () => import("@/pages/public/product/product-detail/ProductDetailPage")
);

export default function App() {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [pathName]);

  return (
    <Suspense fallback={<SpinnerLogo />}>
      <Routes>
        {/* Layout of public */}
        <Route element={<Navigate replace to={"/"} />} />
        <Route path={"/"} element={<PublicLayOut />}>
          <Route path={PATH_USER.login} element={<LoginPage />} />
          <Route
            path={`${PATH_USER.login}/success/google`}
            element={<LoginSuccessGooglePage />}
          />
          <Route path={PATH_USER.register} element={<RegisterPage />} />
          <Route path={PATH_USER.home} element={<HomePage />} />
          <Route path={PATH_USER.generateOTP} element={<GenerateOTPPage />} />
          <Route path={PATH_USER.confirmOTP} element={<ConfirmOTPPage />} />
          <Route
            path={PATH_USER.resetPassword}
            element={<ResetPasswordPage />}
          />
          <Route
            path={PATH_USER.productCategory}
            element={<ProductCategoryPageUser />}
          />
          <Route
            path={PATH_USER.productDetail}
            element={<ProductDetailPageUser />}
          />
        </Route>

        {/* Layout of private */}
        <Route element={<ProtectPrivateRouter />}>
          <Route path={PATH_ADMIN.admin} element={<AdminPageLayout />}>
            <Route path={PATH_ADMIN.brand} element={<BrandPage />}>
              <Route path="" element={<BrandTablePage />} />
            </Route>

            <Route
              path={PATH_ADMIN.productCategoryGroup}
              element={<ProductCategoryGroupPage />}
            >
              <Route path="" element={<ProductCategoryGroupTablePage />} />
              <Route
                path={"create"}
                element={<ProductCategoryGroupCreatePage />}
              />
              <Route
                path={"update/:productCategoryGroupId"}
                element={<ProductCategoryGroupUpdatePage />}
              />
            </Route>

            <Route
              path={PATH_ADMIN.productCategory}
              element={<ProductCategoryPage />}
            >
              <Route path="" element={<ProductCategoryTablePage />} />
              <Route path={"create"} element={<ProductCategoryCreatePage />} />
              <Route
                path={"update/:productCategoryId"}
                element={<ProductCategoryUpdatePage />}
              />
            </Route>

            <Route path={PATH_ADMIN.demand} element={<DemandPage />}>
              <Route path="" element={<DemandTablePage />} />
              <Route path={"create"} element={<DemandCreatePage />} />
              <Route path={"update/:demandId"} element={<DemandUpdatePage />} />
            </Route>

            <Route path={PATH_ADMIN.user} element={<UserPage />}>
              <Route path="" element={<UserTablePage />} />
              <Route path={`search`} element={<UserSearchPage />} />
              <Route path={`createEmployees`} element={<UserCreatePage />} />
            </Route>

            <Route path={PATH_ADMIN.order} element={<OrderPage />}>
              <Route path={""} element={<OrderTablePage />} />
            </Route>

            <Route path={PATH_ADMIN.coupon} element={<CouponPage />}>
              <Route path="" element={<CouponTablePage />} />
              <Route path={`create`} element={<CouponCreatePage />} />
              <Route path={`update/:couponId`} element={<CouponEditPage />} />
            </Route>

            <Route path={PATH_ADMIN.discount} element={<DiscountPage />}>
              <Route path={``} element={<DiscountTablePage />} />
              <Route path={`create`} element={<DiscountCreatePage />} />
              <Route
                path={`update/:discountId`}
                element={<DiscountEditPage />}
              />
              <Route
                path={`addProduct/:discountId`}
                element={<DiscountAddProductsPage />}
              />
            </Route>

            <Route path={PATH_ADMIN.rating} element={<RatingPage />} />
            <Route path={PATH_ADMIN.setting} element={<SettingPage />} />
            <Route path={PATH_ADMIN.payment} element={<PaymentPage />} />

            <Route path={PATH_ADMIN.product} element={<ProductPage />}>
              <Route path={``} element={<ProductTablePage />} />
              <Route path={`create`} element={<ProductCreatePage />} />
              <Route
                path={`update/:productId`}
                element={<ProductUpdatePage />}
              />
            </Route>

            <Route path={PATH_ADMIN.customer} element={<CustomerPage />} />
            <Route path={PATH_ADMIN.question} element={<QuestionPage />} />
            <Route path={PATH_ADMIN.wishlist} element={<WishlistPage />} />

            <Route path={PATH_ADMIN.dashboard} element={<DashboardPage />} />
            <Route path={PATH_ADMIN.inventory} element={<InventoryPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
