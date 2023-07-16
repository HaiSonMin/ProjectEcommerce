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
  ProductCategoryPage,
} from "./pages/private";
import { PublicLayOut } from "./pages/public";
import { CONSTANT } from "./utils";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate replace to={"/admin"} />} />
        {/* Layout of public */}
        <Route path={"/"} element={<PublicLayOut />} />

        {/* Layout of private */}
        <Route path={CONSTANT.PATH_ADMIN.admin} element={<AdminLayout />}>
          <Route path={CONSTANT.PATH_ADMIN.user} element={<UserPage />} />
          <Route path={CONSTANT.PATH_ADMIN.brand} element={<BrandPage />} />
          <Route path={CONSTANT.PATH_ADMIN.order} element={<OrderPage />} />
          <Route path={CONSTANT.PATH_ADMIN.coupon} element={<CouponPage />} />
          <Route path={CONSTANT.PATH_ADMIN.rating} element={<RatingPage />} />
          <Route path={CONSTANT.PATH_ADMIN.setting} element={<SettingPage />} />
          <Route path={CONSTANT.PATH_ADMIN.payment} element={<PaymentPage />} />
          <Route path={CONSTANT.PATH_ADMIN.product} element={<ProductPage />} />
          <Route
            path={CONSTANT.PATH_ADMIN.customer}
            element={<CustomerPage />}
          />
          <Route
            path={CONSTANT.PATH_ADMIN.discount}
            element={<DiscountPage />}
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
          <Route
            path={CONSTANT.PATH_ADMIN.productCategory}
            element={<ProductCategoryPage />}
          />
        </Route>
      </Routes>
    </>
  );
}
