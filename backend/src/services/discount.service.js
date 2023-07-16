const { DiscountModel } = require("../models");
const { DiscountRepo, ProductRepo } = require("../repositories");
const { convertOperatorObject, convertFieldsToArray } = require("../utils");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class DiscountService {
  static async createDiscount(req, res) {
    const payload = req.body;
    const newDiscount = await DiscountModel.create(payload);
    if (!newDiscount) throw new BadRequestError("Create Discount Error");
    return newDiscount;
  }

  static async getAllDiscounts(req, res) {
    const { sort, limit, page, fields, unFields, numericFilters } = req.query;
    const discounts = await DiscountRepo.getAllDiscounts({
      sort,
      page,
      limit,
      filter: {
        ...convertOperatorObject({
          numericFilters,
          option: ["discount_value"],
        }),
      },
      select: convertFieldsToArray(fields),
      unSelect: convertFieldsToArray(unFields),
    });
    if (!discounts.length) throw new NotFoundError("Discount haven't exists");
    return {
      numberDiscount: discounts.length,
      discounts,
    };
  }

  static async getAllDiscountsPercentage(req, res) {
    const { sort, limit, page, fields, unFields, numericFilters } = req.query;
    const discounts = await DiscountRepo.getAllDiscounts({
      sort,
      page,
      limit,
      filter: {
        ...convertOperatorObject({
          numericFilters,
          option: ["discount_value"],
        }),
        discount_type: "percentage",
      },
      select: convertFieldsToArray(fields),
      unSelect: convertFieldsToArray(unFields),
    });
    if (!discounts.length) throw new NotFoundError("Discount haven't exists");
    return {
      numberDiscount: discounts.length,
      discounts,
    };
  }

  static async getAllDiscountsFixedAmount(req, res) {
    const { sort, limit, page, fields, unFields, numericFilters } = req.query;
    const discounts = await DiscountRepo.getAllDiscounts({
      sort,
      page,
      limit,
      filter: {
        ...convertOperatorObject({
          numericFilters,
          option: ["discount_value"],
        }),
        discount_type: "fixed_amount",
      },
      select: convertFieldsToArray(fields),
      unSelect: convertFieldsToArray(unFields),
    });
    if (!discounts.length) throw new NotFoundError("Discount haven't exists");
    return {
      numberDiscount: discounts.length,
      discounts,
    };
  }

  static async getDiscountById(req, res) {
    const { discountId } = req.params;
    const discount = await DiscountRepo.getDiscountById({ discountId });
    if (!discount) throw new NotFoundError("Discount hasn't exists");
    return discount;
  }

  static async searchDiscount(req, res) {
    const { keySearch } = req.body;
    const discounts = await DiscountRepo.searchDiscount({ keySearch });
    if (!discounts.length) throw new NotFoundError("Discount haven't exists");
    return {
      numberDiscount: discounts.length,
      discounts,
    };
  }

  static async getDiscountsAvailable(req, res) {
    const discounts = await DiscountRepo.getDiscountsAvailable();
    if (!discounts.length) throw new NotFoundError("Discount haven't exist");
    return {
      numberDiscount: discounts.length,
      discounts,
    };
  }

  static async getDiscountsUnavailable(req, res) {
    const discounts = await DiscountRepo.getDiscountsUnavailable();
    if (!discounts.length) throw new NotFoundError("Discount haven't exist");
    return {
      numberDiscount: discounts.length,
      discounts,
    };
  }

  static async getAllProductsWithDiscount(req, res) {
    const { discountId } = req.params;
    // Check Discount has exist
    const discount = await DiscountRepo.getDiscountById({ discountId });
    if (!discount) throw new NotFoundError("Discount doesn't exist");
    const { discount_productIds: productIds } = discount;
    const products = await ProductRepo.getProductByIds({ productIds });
    if (!products.length) throw new NotFoundError("Product haven't exist");
    return {
      numberProducts: products.length,
      products,
    };
  }

  static async getAllProductsWithoutDiscount(req, res) {
    const { discountId } = req.params;
    // Check Discount has exist
    const discount = await DiscountRepo.getDiscountById({ discountId });
    if (!discount) throw new NotFoundError("Discount doesn't exist");
    const { discount_productIds: productIds } = discount;
    const products = await ProductRepo.getProductNotByIds({ productIds });
    if (!products.length) throw new NotFoundError("Product haven't exist");
    return {
      numberProducts: products.length,
      products,
    };
  }

  static async updateDiscount(req, res) {
    const { discountId } = req.params;
    const payload = req.body;
    const { discount_type, discount_value } = payload;

    console.log(discount_type);

    if (discount_type) {
      // Check value if discountType = fixed_amount
      if (discount_type === "fixed_amount" && discount_value < 5)
        throw new BadRequestError(
          "Value not correct with type discount, value must be (value >= 5), please try again"
        );

      // Check value if discountType = fixed_amount
      if (
        discount_type === "percentage" &&
        (discount_value < 1 || discount_value > 100)
      )
        throw new BadRequestError(
          "Value not correct with type discount, value must be (1 <= value <= 100), please try again"
        );
    }

    const discountUpdated = await DiscountRepo.updateDiscount({
      discountId,
      payload,
    });
    if (!discountUpdated) throw new BadRequestError("Update discount error");

    return discountUpdated;
  }

  static async addDiscountToProducts(req, res) {
    const { discountId } = req.params;
    const { productIds } = req.body;

    // Check discount has exists
    const discount = await DiscountRepo.getDiscountById({ discountId });
    if (!discount || discount.discount_endDate < Date.now())
      throw new NotFoundError("Discount hasn't exists or expired");

    // Check products have exists for to add to discount
    const products = await Promise.all(
      productIds.map(async (productId) => {
        // Check product has exist
        const product = await ProductRepo.getProductById({
          productId,
          unSelect: ["__v"],
        });
        if (!product)
          throw new NotFoundError(
            `Product With ID:${productId} hasn't exist so the discount can be applied`
          );
        // Check product has apply discount
        const isApplyDiscount = await DiscountModel.findOne({
          discount_productIds: { $elemMatch: { $eq: productId } },
          // discount_productIds: productId, // Can be apply this to looking for one element in array
        });
        if (isApplyDiscount)
          throw new BadRequestError(
            `Product With ID:${productId} has applied discount`
          );

        // Check type before applied
        let priceAppliedDiscount = 0;
        if (discount.discount_type === "percentage")
          priceAppliedDiscount =
            product.product_price -
            (product.product_price * discount.discount_value) / 100;
        else
          priceAppliedDiscount =
            product.product_price - discount.discount_value;

        console.log("priceAppliedDiscount:::", priceAppliedDiscount);

        // Set price of product
        await product.updateOne({
          $set: { product_priceAppliedDiscount: priceAppliedDiscount },
        });
        return product;
      })
    );

    await discount
      .updateOne({
        $addToSet: { discount_productIds: productIds },
      })
      .exec();
    return {
      products,
    };
  }

  static async deleteDiscount(req, res) {
    const { discountId } = req.params;
    const discountDeleted = await DiscountRepo.deleteDiscount({ discountId });
    if (!discountDeleted) throw new BadRequestError("Delete discount error");

    // Set Product Has been applied discount
    const productIds = discountDeleted.discount_productIds;
    await Promise.all(
      productIds.map(async (productId) => {
        const product = await ProductRepo.getProductById({ productId });
        if (product)
          await product.updateOne({
            $set: { product_priceAppliedDiscount: 0 },
          });
        return;
      })
    );
    return discountDeleted;
  }

  static async updateProductPriceWhenDiscountExpired(req, res) {}

  static async deleteAllDiscountsUnAvailable(req, res) {
    await DiscountRepo.deleteAllDiscountsUnAvailable();
    return;
  }
}

module.exports = DiscountService;
