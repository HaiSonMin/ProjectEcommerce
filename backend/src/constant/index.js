const CONSTANT = {
  TIME_STORE_REDIS: 600 + Math.floor(Math.random() * 60), // second
  SALT: 10,
  MAX_UPLOAD_IMAGES: 20,
  RF_TOKEN_NAME: 'refreshToken',
  MODELS_NAMES: {
    blog: 'Blog',
    cart: 'Cart',
    chat: 'Chat',
    user: 'User',
    brand: 'Brand',
    order: 'Order',
    coupon: 'Coupon',
    demand: 'Demand',
    rating: 'Rating',
    payment: 'Payment',
    comment: 'Comment',
    product: 'Product',
    discount: 'Discount',
    keyToken: 'KeyToken',
    wishlist: 'Wishlist',
    question: 'Question',
    inventory: 'Inventory',
    userAddress: 'UserAddress',
    blogCategory: 'BlogCategory',
    notification: 'Notification',
    productCategory: 'ProductCategory',
    productCategoryGroup: 'ProductCategoryGroup',
  },
};

module.exports = CONSTANT;
