const { BadRequestError } = require("../core/error.response");
const { CouponModel } = require("../models");
const {
  CouponRepo,
  ProductRepo,
  ProductCategoryRepo,
} = require("../repositories");
const { convertOperatorObject } = require("../utils");

class CouponService {
  static async createCoupon(req, res) {
    console.log(req.body);
    const payload = req.body;
    const {
      coupon_minimumOrderValue,
      coupon_value,
      coupon_type,
      coupon_applicableProducts,
      coupon_applicableProductCategories,
    } = payload || {};
    // 1. Check minimum Order value with value
    if (
      coupon_minimumOrderValue < coupon_value &&
      coupon_type === "fixed_amount"
    )
      throw new BadRequestError(
        "coupon_minimumOrderValue must be getter than equal coupon_value"
      );

    // 2. Check value if coupon type when ===  fixed_amount
    if (coupon_type === "fixed_amount" && coupon_value <= 1)
      throw new BadRequestError(
        "Value not correct with type discount, value must be (value >= 1), please try again"
      );

    // 3. Check value if coupon type when ===  percentage
    if (
      coupon_type === "percentage" &&
      (coupon_value < 1 || coupon_value > 100)
    )
      throw new BadRequestError(
        "Value not correct with type discount, value must be (1 <= value <= 100), please try again"
      );

    // 4. Check product have exist
    if (coupon_applicableProducts && coupon_applicableProducts.length)
      await Promise.all(
        coupon_applicableProducts?.map(async (productId) => {
          console.log(productId);
          const findProduct = await ProductRepo.getProductById({ productId });
          if (!findProduct)
            throw new BadRequestError(
              `Product with id:${productId} hasn't exist`
            );
          return;
        })
      );

    // 5. Check product category have exist
    if (
      coupon_applicableProductCategories &&
      coupon_applicableProductCategories?.length
    )
      await Promise.all(
        coupon_applicableProductCategories?.map(async (productCategoryId) => {
          const findProductCategory =
            await ProductCategoryRepo.getProductCategoryById({
              productCategoryId,
            });
          if (!findProductCategory)
            throw new BadRequestError(
              `Product category with id:${productCategoryId} hasn't exist`
            );
          return;
        })
      );

    const newCoupon = await CouponModel.create(payload);
    if (!newCoupon) throw new BadRequestError("Create Discount Error");
    return newCoupon;
  }

  static async getAllCoupons(req, res) {
    const { sort, limit, page, status, numericFilters } = req.query;
    const { coupons, totalCoupons } = await CouponRepo.getAllCoupons({
      sort,
      page,
      limit,
      status,
      filter: {
        ...convertOperatorObject({
          numericFilters,
          option: [
            "coupon_value",
            "coupon_minimumOrderValue",
            "coupon_numberOfApplication",
          ],
        }),
      },
    });
    return {
      totalCoupons,
      couponsPerPage: coupons.length,
      coupons,
    };
  }

  static async getCouponById(req, res) {
    const { couponId } = req.params;
    const coupon = await CouponRepo.getCouponById({ couponId });
    if (!coupon) throw new NotFoundError("Coupon hasn't exists");
    return coupon;
  }

  static async searchCoupons(req, res) {
    const { keySearch } = req.query;
    const { coupons, totalCoupons } = await CouponRepo.searchCoupons({
      keySearch,
    });
    return {
      totalCoupons,
      couponsPerPage: coupons.length,
      coupons,
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

  static async updateCoupon(req, res) {
    const { couponId } = req.params;
    const payload = req.body;
    const {
      coupon_minimumOrderValue,
      coupon_value,
      coupon_type,
      coupon_appliesAll,
      coupon_applicableProducts,
      coupon_applicableProductCategories,
    } = payload || {};
    // 1. Check minimum Order value with value
    if (
      coupon_minimumOrderValue < coupon_value &&
      coupon_type === "fixed_amount"
    )
      throw new BadRequestError(
        "coupon_minimumOrderValue must be getter than equal coupon_value"
      );

    // 2. Check value if coupon type when ===  fixed_amount
    if (coupon_type === "fixed_amount" && coupon_value <= 1)
      throw new BadRequestError(
        "Value not correct with type discount, value must be (value >= 1), please try again"
      );

    // 3. Check value if coupon type when ===  percentage
    if (
      coupon_type === "percentage" &&
      (coupon_value < 1 || coupon_value > 100)
    )
      throw new BadRequestError(
        "Value not correct with type discount, value must be (1 <= value <= 100), please try again"
      );
    // 4. Check product have exist
    if (coupon_applicableProducts && coupon_applicableProducts.length)
      await Promise.all(
        coupon_applicableProducts?.map(async (productId) => {
          console.log(productId);
          const findProduct = await ProductRepo.getProductById({ productId });
          if (!findProduct)
            throw new BadRequestError(
              `Product with id:${productId} hasn't exist`
            );
          return;
        })
      );

    // 5. Check product category have exist
    if (
      coupon_applicableProductCategories &&
      coupon_applicableProductCategories.length
    )
      await Promise.all(
        coupon_applicableProductCategories?.map(async (productCategoryId) => {
          const findProductCategory =
            await ProductCategoryRepo.getProductCategoryById({
              productCategoryId,
            });
          if (!findProductCategory)
            throw new BadRequestError(
              `Product category with id:${productCategoryId} hasn't exist`
            );
          return;
        })
      );

    const couponUpdated = await CouponRepo.updateCoupon({
      couponId,
      payload,
    });

    if (!couponUpdated)
      throw new BadRequestError(`Update coupon with id:${couponId} error`);

    return couponUpdated;
  }

  static async addCouponToProducts(req, res) {
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

  static async deleteCoupon(req, res) {
    const { couponId } = req.params;
    const couponDeleted = await CouponRepo.deleteCoupon({ couponId });
    if (!couponDeleted) throw new BadRequestError("Delete discount error");
    return couponDeleted;
  }

  static async deleteAllCouponsExpired(req, res) {
    await CouponRepo.deleteAllCouponsExpired();
    return;
  }
}

module.exports = CouponService;
