const { BlogCategoryModel } = require("../models");

class BlogCategoryRepo {
  static async getBlogCategoryById({ blogCategoryId }) {
    return await BlogCategoryModel.findById(blogCategoryId);
  }

  static async getAllBlogCategories({ select }) {
    return await BlogCategoryModel.find().select(select).lean().exec();
  }

  static async updateBlogCategoryById({ blogCategoryId, payload }) {
    return await BlogCategoryModel.findByIdAndUpdate(blogCategoryId, payload, {
      new: true,
    })
      .lean()
      .exec();
  }

  static async deletedBlogCategoryById({ blogCategoryId }) {
    return await BlogCategoryModel.findByIdAndDelete(blogCategoryId)
      .lean()
      .exec();
  }
}

module.exports = BlogCategoryRepo;
