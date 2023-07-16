type TypePathAdmin = {
  blog: string;
  user: string;
  admin: string;
  brand: string;
  order: string;
  rating: string;
  coupon: string;
  account: string;
  payment: string;
  setting: string;
  product: string;
  customer: string;
  discount: string;
  question: string;
  wishlist: string;
  inventory: string;
  dashboard: string;
  blogCategory: string;
  productCategory: string;
};

type TypePathV1Api = Omit<TypePathAdmin, "user">;

type TypePathUser = {
  login: string;
  notfound: string;
};

class Constant {
  LIMIT_PAGE: number;
  SORT_DEFAULT: string;
  PATH_USER: TypePathUser;
  PATH_ADMIN: TypePathAdmin;
  PATH_V1_API: TypePathV1Api;
  constructor() {
    this.LIMIT_PAGE = 10;
    this.SORT_DEFAULT = "ctime";
    this.PATH_USER = {
      login: "login",
      notfound: "*",
    };
    this.PATH_ADMIN = {
      user: "user",
      blog: "blog",
      admin: "admin",
      brand: "brand",
      order: "order",
      rating: "rating",
      coupon: "coupon",
      account: "account",
      payment: "payment",
      setting: "setting",
      product: "product",
      customer: "customer",
      discount: "discount",
      question: "question",
      wishlist: "wishlist",
      inventory: "inventory",
      dashboard: "dashboard",
      blogCategory: "blogCategory",
      productCategory: "productCategory",
    };
    this.PATH_V1_API = {
      blog: "v1/admin",
      admin: "v1/admin",
      brand: "v1/brand",
      order: "v1/order",
      rating: "v1/rating",
      coupon: "v1/coupon",
      account: "v1/account",
      payment: "v1/payment",
      setting: "v1/setting",
      product: "v1/product",
      customer: "v1/customer",
      discount: "v1/discount",
      question: "v1/question",
      wishlist: "v1/wishlist",
      inventory: "v1/inventory",
      dashboard: "v1/dashboard",
      blogCategory: "v1/blogCategory",
      productCategory: "v1/productCategory",
    };
  }
}

const CONSTANT = new Constant();

export default CONSTANT;
