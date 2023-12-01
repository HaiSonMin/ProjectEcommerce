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
  TYPE_NOTIFICATION: {
    'PRODUCT-001': 'PRODUCT-001', // CREATE NEW PRODUCT => thumb of new product
    'ORDER-001': 'ORDER-001', // ORDER SUCCESS => thumb when order success
    'ORDER-002': 'ORDER-002', // ORDER FAIL => thumb when order fail
    'SHIPPING-001': 'SHIPPING-001', // ON DELIVERY => thumb when on delivery
    'SHIPPING-002': 'SHIPPING-002', // DELIVERED => thumb when on delivered
    'COUPON-001': 'COUPON-001', // HAVE NEW COUPON => thumb when shop give user coupon code
    'COUPON-002': 'COUPON-002', // HAVE COUPON ALMOST EXPIRED => only one day
    'DISCOUNT-001': 'DISCOUNT-001', // PRODUCT IS ON SALE => thumb when shop safe some thing product
    'DISCOUNT-002': 'DISCOUNT-002', // PRODUCT IS SALE ALMOST OVER => only one day
  },
  TYPE_EXCHANGE: {
    TOPIC: 'topic',
    FANOUT: 'fanout',
    DIRECT: 'direct',
    HEADER: 'header',
  },
};

module.exports = CONSTANT;
