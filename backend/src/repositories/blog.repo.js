const { BlogModel } = require("../models");
const {
  getSelectData,
  getUnSelectData,
  skipPage,
  convertSortBy,
} = require("../utils");

class BlogRepo {
  static async getBlogById({ blogId }) {
    return await BlogModel.findById(blogId).exec()
  }

  static async getAllBlogs({
    sort,
    page = 1,
    limit = 5,
    filter,
    select,
    unSelect,
  }) {
    return await BlogModel.find(filter)
      .select(getSelectData(select))
      .select(getUnSelectData(unSelect))
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .sort(convertSortBy(sort))
      .populate({ path: "blog_category", select: "blogCategory_name" })
      .lean()
      .exec();
  }

  static async updateBlogById({ blogId, payload }) {
    return await BlogModel.findByIdAndUpdate(blogId, payload, {
      new: true,
    })
      .lean()
      .exec();
  }

  static async deletedBlogById({ blogId }) {
    return await BlogModel.findByIdAndDelete(blogId).lean().exec();
  }
}

module.exports = BlogRepo;
