const { NotFoundError } = require("../core/error.response");
const { CartModel } = require("../models");

class CartRepo {
  static async getCartByCartId({ cartId }) {
    return await CartModel.findById(cartId).exec();
  }

  static async getCartByUserId({ userId }) {
    return await CartModel.findOne({ cart_userId: userId }).exec();
  }

  static async updateUserCart({ cart, product }) {
    return await cart
      .updateOne({
        $addToSet: { cart_products: product },
        $inc: { cart_countProduct: product.quantity },
      })
      .exec();
  }

  static async deleteProduct({ userId, productId }) {
    console.log(userId, productId);
    const cartProduct = await CartModel.findOne({
      cart_userId: userId,
      "cart_products.productId": productId,
    }).exec();

    if (!cartProduct) throw new NotFoundError("Not found product for delete");

    const productDeleted = cartProduct.cart_products.find((p) => p.productId === productId);

    await cartProduct.updateOne({
      $pull: {
        cart_products: productDeleted,
      },
      $inc: {
        cart_countProduct: -productDeleted.quantity,
      },
    });

    return productDeleted;
  }

  static async deleteAllProducts({ userId }) {
    const cartProduct = await CartModel.findOne({
      cart_userId: userId,
    }).exec();

    if (!cartProduct.cart_countProduct) throw new NotFoundError("Not found cart for delete");

    await cartProduct.updateOne({
      $set: {
        cart_products: [],
        cart_countProduct: 0,
      },
    });

    return cartProduct.cart_products;
  }
}

module.exports = CartRepo;
