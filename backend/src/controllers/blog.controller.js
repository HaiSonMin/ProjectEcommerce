const { CREATED, OK } = require("../core/success.response");
const { BlogService } = require("../services");
class BlogController {
  static async createBlog(req, res) {
    new CREATED({
      message: "Create Blog Successfully",
      metadata: await BlogService.createBlog(req, res),
    }).send(res);
  }

  static async getAllBlogs(req, res) {
    new OK({
      message: "Get All Blog Successfully",
      metadata: await BlogService.getAllBlogs(req, res),
    }).send(res);
  }

  static async getBlogById(req, res) {
    new OK({
      message: "Get Blog By Id Successfully",
      metadata: await BlogService.getBlogById(req, res),
    }).send(res);
  }

  static async likeBlog(req, res) {
    new OK({
      message: "Like Blog Successfully",
      metadata: await BlogService.likeBlogById(req, res),
    }).send(res);
  }

  static async dislikeBlog(req, res) {
    new OK({
      message: "Dislike Blog Successfully",
      metadata: await BlogService.dislikeBlogById(req, res),
    }).send(res);
  }

  static async updateBlog(req, res) {
    new OK({
      message: "Update Blog Successfully",
      metadata: await BlogService.updateBlogById(req, res),
    }).send(res);
  }

  static async deleteBlog(req, res) {
    new OK({
      message: "Delete Blog Successfully",
      metadata: await BlogService.deletedBlogById(req, res),
    }).send(res);
  }
}

module.exports = BlogController;
