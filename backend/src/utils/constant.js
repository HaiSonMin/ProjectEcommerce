class CONSTANT {
  constructor() {
    this.MAX_UPLOAD_IMAGES = 20;
    this.SALT = 10;
    this.MODELS_NAMES = {
      blog: "Blog",
      cart: "Cart",
      chat: "Chat",
      user: "User",
      brand: "Brand",
      order: "Order",
      coupon: "Coupon",
      demand: "Demand",
      rating: "Rating",
      payment: "Payment",
      product: "Product",
      discount: "Discount",
      keyToken: "KeyToken",
      wishlist: "Wishlist",
      question: "Question",
      inventory: "Inventory",
      userAddress: "UserAddress",
      blogCategory: "BlogCategory",
      notification: "Notification",
      productCategory: "ProductCategory",
      productCategoryGroup: "ProductCategoryGroup",
    };
  }
}
module.exports = new CONSTANT();
