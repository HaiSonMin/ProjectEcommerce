type PathAdminType = {
  blog: string;
  user: string;
  admin: string;
  brand: string;
  order: string;
  demand: string;
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

type PathPublicType = {
  home: string;
  user: string;
  brand: string;
  order: string;
  rating: string;
  coupon: string;
  account: string;
  payment: string;
  product: string;
  discount: string;
  question: string;
  wishlist: string;
};

type ProductCategoryType = {
  air: string;
  sound: string;
  office: string;
  cabinet: string;
  cooking: string;
  healthy: string;
  clothes: string;
  accessory: string;
  technology: string;
  waterDrink: string;
  electricAppliances: string;
};

type PathV1ApiType = Omit<PathAdminType, "user">;

type PathUserType = {
  login: string;
  notfound: string;
};

class Constant {
  LIMIT_PAGE: number;
  SORT_DEFAULT: string;
  PATH_USER: PathUserType;
  PATH_ADMIN: PathAdminType;
  PATH_PUBLIC: PathPublicType;
  PATH_V1_API: PathV1ApiType;
  MAX_UPLOAD_IMAGE: number;
  TYPE_PRODUCT_CATEGORY: ProductCategoryType;
  RAM: object;
  ROM: object;
  constructor() {
    this.LIMIT_PAGE = 10;
    this.MAX_UPLOAD_IMAGE = 10;
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
      demand: "demand",
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
    this.PATH_PUBLIC = {
      home: "",
      user: "user",
      brand: "brand",
      order: "order",
      rating: "rating",
      coupon: "coupon",
      account: "account",
      payment: "payment",
      product: "product",
      discount: "discount",
      question: "question",
      wishlist: "wishlist",
    };
    this.PATH_V1_API = {
      blog: "/v1/admin",
      admin: "/v1/admin",
      brand: "/v1/brand",
      order: "/v1/order",
      rating: "/v1/rating",
      coupon: "/v1/coupon",
      demand: "/v1/demand",
      account: "/v1/account",
      payment: "/v1/payment",
      setting: "/v1/setting",
      product: "/v1/product",
      customer: "/v1/customer",
      discount: "/v1/discount",
      question: "/v1/question",
      wishlist: "/v1/wishlist",
      inventory: "/v1/inventory",
      dashboard: "/v1/dashboard",
      blogCategory: "/v1/blogCategory",
      productCategory: "/v1/productCategory",
    };
    this.ROM = {
      "32GB": "32GB",
      "64GB": "64GB",
      "128GB": "128GB",
      "256GB": "256GB",
      "512GB": "512GB",
      "1TB": "1TB",
    };
    this.RAM = {
      "4GB": "32GB",
      "6GB": "64GB",
      "8GB": "128GB",
      "12GB": "258GB",
      "16GB": "512GB",
      "24GB": "24GB",
    };
    this.TYPE_PRODUCT_CATEGORY = {
      air: "Air",
      sound: "Sound",
      office: "Office",
      clothes: "Clothes",
      cabinet: "Cabinet",
      cooking: "Cooking",
      healthy: "Healthy-Beautify",
      accessory: "Accessory",
      technology: "Technology",
      waterDrink: "WaterDrink",
      electricAppliances: "ElectricAppliances",
    };
  }
}

const CONSTANT = new Constant();

export default CONSTANT;
