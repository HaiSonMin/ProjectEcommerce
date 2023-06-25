const { BadRequestError, NotFoundError } = require("../core/error.response");
const { BlogCategoryModel } = require("../models");
const { BlogCategoryRepo } = require("../repositories");
const { convertFieldsToArray } = require("../utils");

class BlogCategoryService {
  static async createBlogCategory(req, res) {
    const payload = req.body;
    const newBlogCategory = await BlogCategoryModel.create(payload);
    if (!newBlogCategory)
      throw new BadRequestError("Create blog category error");
    return newBlogCategory;
  }

  static async getBlogCategoryById(req, res) {
    const { blogCategoryId } = req.params;
    const blogCategory = await BlogCategoryRepo.getBlogCategoryById({
      blogCategoryId,
    });
    if (!blogCategory) throw new NotFoundError("Not found blog category");
    return blogCategory;
  }

  static async getAllBlogCategories(req, res) {
    const { fields } = req.query;
    const blogCategories = await BlogCategoryRepo.getAllBlogCategories({
      select: convertFieldsToArray(fields),
    });
    if (!blogCategories.length)
      throw new NotFoundError("Not found blog categories");
    return {
      blogCategoryQuantity: blogCategories.length,
      blogCategories,
    };
  }

  static async updateBlogCategoryById(req, res) {
    const { blogCategoryId } = req.params;
    const payload = req.body;
    const blogCategoryUpdated = await BlogCategoryRepo.updateBlogCategoryById({
      blogCategoryId,
      payload,
    });
    if (!blogCategoryUpdated)
      throw new BadRequestError("Blog category update error");
    return blogCategoryUpdated;
  }

  static async deletedBlogCategoryById(req, res) {
    const { blogCategoryId } = req.params;
    const blogCategoryDeleted = await BlogCategoryRepo.deletedBlogCategoryById({
      blogCategoryId,
    });
    if (!blogCategoryDeleted)
      throw new BadRequestError("Blog category delete error");
    return blogCategoryDeleted;
  }
}

module.exports = BlogCategoryService;
