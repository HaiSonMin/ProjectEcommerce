const { CREATED, OK } = require("../core/success.response");
const { BlogCategoryService } = require("../services");
class BlogCategoryController {
  static async createBlogCategory(req, res) {
    new CREATED({
      message: "Create Blog Category Successfully",
      metadata: await BlogCategoryService.createBlogCategory(req, res),
    }).send(res);
  }

  static async getAllBlogCategories(req, res) {
    new OK({
      message: "Get All Blog Categories Successfully",
      metadata: await BlogCategoryService.getAllBlogCategories(req, res),
    }).send(res);
  }

  static async updateBlogCategory(req, res) {
    new OK({
      message: "Update Blog Category Successfully",
      metadata: await BlogCategoryService.updateBlogCategoryById(req, res),
    }).send(res);
  }

  static async deleteBlogCategory(req, res) {
    new OK({
      message: "Delete Blog Category Successfully",
      metadata: await BlogCategoryService.deletedBlogCategoryById(req, res),
    }).send(res);
  }
}

module.exports = BlogCategoryController;
