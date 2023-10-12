import { Suspense, lazy, useEffect } from "react";
import {
  ProtectMemberRouter,
  ProtectPrivateRouter,
} from "@/components/protect-routers";
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
import {
  PATH_AUTH,
  PATH_BLOG,
  PATH_ADMIN,
  PATH_PUBLIC,
  PATH_MEMBER,
} from "./constant/path-router";

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
// ---------------- Auth ----------------
const AuthLayout = lazy(() => import("@/pages/auth/AuthLayout"));
const ConfirmOTPPage = lazy(() => import("@/pages/auth/confirm-otp"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));
const GenerateOTPPage = lazy(() => import("@/pages/auth/generate-otp"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/reset-password"));
const IncentivesPage = lazy(() => import("@/pages/auth/incentive"));
const CheckingOrderPage = lazy(() => import("@/pages/auth/checking-order") )
// ---------------- Member ----------------
const MemberLayout = lazy(() => import("@/pages/member/MemberLayout"));
const DashboardMember = lazy(
  () => import("@/pages/member/dash-board/Dashboard")
);
const HomePageMember = lazy(
  () => import("@/pages/member/page/HomePage")
);
const HistoryOrder = lazy(
  () => import("@/pages/member/page/HistoryOrder")
);
const WarrantyLookup = lazy(
  () => import("@/pages/member/page/WarrantyLookup")
);
const YourOffers = lazy(
  () => import("@/pages/member/page/YourOffers")
);
const MembershipRank = lazy(
  () => import("@/pages/member/page/MembershipRank")
);
const YourAccount = lazy(
  () => import("@/pages/member/page/YourAccount")
);
const SupportMember = lazy(
  () => import("@/pages/member/page/Support")
);
const MemberFeedBack = lazy(() => import("@/pages/member/feedback/Feedback"));
const MemberLogout = lazy(
  () => import("@/pages/member/page/Logout")
);

const LoginSuccessGooglePage = lazy(
  () => import("@/pages/auth/login-google-success")
);

// ---------------- Public ----------------
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
const CartPage = lazy(() => import("@/pages/public/cart/CartPage"));

// ---------------- Blog ----------------
const BlogPageLayout = lazy(() => import("@/pages/blog"));
const BlogHomePageLayout = lazy(() => import("@/pages/blog/home"));
const BlogCategoryPageLayout = lazy(() => import("@/pages/blog/category"));

export default function App() {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [pathName]);

  return (
    <Suspense fallback={<SpinnerLogo />}>
      <Routes>
        <Route element={<Navigate replace to={"/"} />} />

        {/* Public Page */}
        <Route path={PATH_PUBLIC.home} element={<PublicLayOut />}>
          <Route path={PATH_PUBLIC.home} element={<HomePage />} />

          <Route
            path={PATH_PUBLIC.productCategory}
            element={<ProductCategoryPageUser />}
          />
          <Route
            path={PATH_PUBLIC.productDetail}
            element={<ProductDetailPageUser />}
          />
          <Route path={PATH_PUBLIC.cart} element={<CartPage />} />
          <Route path={PATH_PUBLIC.checkingOrder} element={<CheckingOrderPage />} />
        </Route>

        {/* Auth Page */}
        <Route path={PATH_AUTH.auth} element={<AuthLayout />}>
          <Route path={PATH_AUTH.login} element={<LoginPage />} />
          <Route
            path={`${PATH_AUTH.login}/success/google`}
            element={<LoginSuccessGooglePage />}
          />
          <Route path={PATH_AUTH.register} element={<RegisterPage />} />
          <Route path={PATH_AUTH.generateOTP} element={<GenerateOTPPage />} />
          <Route path={PATH_AUTH.confirmOTP} element={<ConfirmOTPPage />} />
          <Route path={PATH_AUTH.incentives} element={<IncentivesPage />} />
          
          <Route
            path={PATH_AUTH.resetPassword}
            element={<ResetPasswordPage />}
          />
        </Route>
        {/* Member Page */}
        <Route path={PATH_MEMBER.member} element={<MemberLayout />}>
          <Route path={PATH_MEMBER.dashboard} element={<DashboardMember />} />
          <Route path={PATH_MEMBER.home} element={<HomePageMember />} />
          <Route path={PATH_MEMBER.historyorder} element={<HistoryOrder />} />
          <Route path={PATH_MEMBER.warranty} element={<WarrantyLookup />} />
          <Route path={PATH_MEMBER.order} element={<YourOffers />} />
          <Route path={PATH_MEMBER.rank} element={<MembershipRank />} />
          <Route path={PATH_MEMBER.account} element={<YourAccount />} />
          <Route path={PATH_MEMBER.support} element={<SupportMember />} />
          <Route path={PATH_MEMBER.feedback} element={<MemberFeedBack />} />
          <Route path={PATH_MEMBER.logout} element={<MemberLogout />} />
        </Route>
        <Route element={<ProtectMemberRouter />}>
          <Route path={PATH_MEMBER.home} element={<PublicLayOut />}></Route>
        </Route>
        {/* Blog Page */}
        <Route path={PATH_BLOG.blogHome} element={<BlogPageLayout />}>
          <Route path={""} element={<BlogHomePageLayout />} />
          <Route
            path={PATH_BLOG.category}
            element={<BlogCategoryPageLayout />}
          />
        </Route>
        {/* Private Page */}
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
