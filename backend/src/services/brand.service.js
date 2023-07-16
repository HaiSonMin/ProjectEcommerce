const { BadRequestError, NotFoundError } = require("../core/error.response");
const { BrandModel } = require("../models");
const { BrandRepo } = require("../repositories");
const { convertFieldsToArray } = require("../utils");

class BrandService {
  static async createBrand(req, res) {
    const payload = req.body;
    const { path: pathImage } = req?.file || {};
    if (!pathImage) throw new BadRequestError("Please provide image brand");
    const newBrand = await BrandModel.create({
      ...payload,
      brand_image: pathImage,
    });
    if (!newBrand) throw new BadRequestError("Create brand error");

    return newBrand;
  }

  static async getBrandById(req, res) {
    const { brandId } = req.params;
    const brand = await BrandRepo.getBrandById({ brandId });
    if (!brand) throw new NotFoundError("Brand doesn't exist");
    return brand;
  }

  static async getBrandByName(req, res) {
    const { brandName } = req.body;
    const brand = await BrandRepo.getBrandByName({ brandName });
    if (!brand) throw new NotFoundError("Brand doesn't exist");
    return brand;
  }

  static async getAllBrand(req, res) {
    const { sort, limit, page, fields } = req.query;
    const { brands, totalBrands } = await BrandRepo.getAllBrands({
      sort,
      limit,
      page,
      select: convertFieldsToArray(fields),
    });
    // console.log("brands::::", brands);
    // if (!brands.length) throw new NotFoundError("Brands don't exists");
    return {
      totalBrands,
      brandsPerPage: brands.length,
      brands,
    };
  }

  static async updateBrand(req, res) {
    const { brandId } = req.params;
    const payload = req.body;
    const pathImages = req?.file?.path;

    const brandUpdated = await BrandRepo.updateBrandById({
      brandId,
      payload: { ...payload, brand_image: pathImages },
    });
    if (!brandUpdated) throw new BadRequestError("Not found brand for update");
    return brandUpdated;
  }

  static async deleteBrand(req, res) {
    const { brandId } = req.params;
    const branDeleted = await BrandRepo.deleteBrandById({ brandId });
    if (!branDeleted) throw new BadRequestError("Not found brand for delete");
    return branDeleted;
  }
}
module.exports = BrandService;
