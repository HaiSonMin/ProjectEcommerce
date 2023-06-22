const { BadRequestError, NotFoundError } = require("../core/error.response");
const { BrandModel } = require("../models");
const { BrandRepo } = require("../repositories");

class BrandService {
  static async createBrand(req, res) {
    const payload = req.body;
    const newBrand = await BrandModel.create(payload);
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
    const brands = await BrandRepo.getAllBrands();
    if (!brands.length) throw new NotFoundError("Brands don't exists");
    return brands;
  }

  static async updateBrand(req, res) {
    const payload = req.body;
    const { brandId } = req.params;
    const brandUpdated = await BrandRepo.updateBrandById({ brandId, payload });
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
