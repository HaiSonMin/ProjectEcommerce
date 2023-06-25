const { BadRequestError, NotFoundError } = require("../core/error.response");
const { CartModel } = require("../models");
const cartModel = require("../models/cart.model");
const { CartRepo, ProductRepo } = require("../repositories");

class CartService {
  static async createUserCart(req, res) {
    const { userId } = req.user;
    const { product } = req.body;

    // Check cart has exit
    return await CartModel.findOneAndUpdate(
      { cart_userId: userId },
      {
        $addToSet: { cart_products: product },
        $inc: { cart_countProduct: product.quantity },
      },
      { new: true, upsert: true }
    ).exec();
  }

  static async getAllProductsByUserId(req, res) {
    const { userId } = req.user;
    console.log(userId);
    const cart = await CartRepo.getCartByUserId({ userId });
    if (!cart) throw new NotFoundError("Cart not found");
    const { cart_products: products, cart_countProduct: numberProduct } = cart;
    if (!numberProduct) throw new NotFoundError("No products in the cart");
    return {
      numberProduct,
      products,
    };
  }

  static async addProductToCart(req, res) {
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    // Check product before add to cart
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct)
      throw new NotFoundError("Not found product for add to cart");

    const cart = await CartRepo.getCartByUserId({ userId });
    if (!cart) return await this.createUserCart(req, res);

    // If has cart but cart.length = 0
    if (!cart.cart_products.length) {
      await CartRepo.updateUserCart({ cart, product: { productId, quantity } });
      return await CartRepo.getCartByUserId({ userId });
    }

    // Add same product
    const updatedProduct = await CartModel.findOneAndUpdate(
      {
        cart_userId: userId,
        "cart_products.productId": productId,
      },
      {
        $inc: {
          "cart_products.$.quantity": quantity,
          cart_countProduct: quantity,
        },
      },
      { new: true }
    ).exec();
    console.log("updatedProduct::::", updatedProduct);

    // Add other the product
    if (!updatedProduct) await CartRepo.updateUserCart({ cart, product });

    return await CartRepo.getCartByUserId({ userId });
  }

  static async updateCart(req, res) {
    const { userId } = req.user;
    const { productId, old_quantity, new_quantity } = req.body;

    // Check product before add to cart
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct)
      throw new NotFoundError("Not found product for to update");

    // If newQuantity === 0 => delete product out of the cart
    if (!new_quantity) return await this.deleteProduct(req, res);

    const cartUpdated = await CartModel.findOneAndUpdate(
      {
        cart_userId: userId,
        "cart_products.productId": productId,
      },
      {
        $inc: {
          "cart_products.$.quantity": new_quantity - old_quantity,
          cart_countProduct: new_quantity - old_quantity,
        },
      },
      { new: true }
    ).exec();

    if (!cartUpdated)
      throw new BadRequestError("Some thing went wrong, please try again");

    return await CartRepo.getCartByUserId({ userId });
  }

  static async deleteProduct(req, res) {
    const { userId } = req.user;
    const { productId } = req.body;
    return await CartRepo.deleteProduct({ userId, productId });
  }

  static async deleteAllProducts(req, res) {
    const { userId } = req.user;
    return await CartRepo.deleteAllProducts({ userId });
  }
}

module.exports = CartService;
