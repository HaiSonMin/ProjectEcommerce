const { BadRequestError, NotFoundError } = require("../core/error.response");
const { BlogModel } = require("../models");
const { BlogRepo } = require("../repositories");
const { convertOperatorObject, convertFieldsToArray } = require("../utils");

class BlogService {
  static async createBlog(req, res) {
    const payload = req.body;
    const newBlog = await BlogModel.create(payload);
    if (!newBlog) throw new BadRequestError("Create blog error");
    return newBlog;
  }

  static async getAllBlogs(req, res) {
    const { sort, page, limit, fields, unFields, numericFilters } = req.query;
    const filter = {
      ...convertOperatorObject({
        numericFilters,
        option: ["blog_numberViews", "blog_numberLikes", "blog_numberDislikes"],
      }),
    };
    const blogs = await BlogRepo.getAllBlogs({
      sort,
      page,
      limit,
      filter,
      select: convertFieldsToArray(fields),
      unSelect: convertFieldsToArray(unFields),
    });

    if (!blogs.length) throw new NotFoundError("Not found blogs");
    return {
      numberBlogs: blogs.length,
      blogs,
    };
  }

  static async getBlogById(req, res) {
    {
      const { blogId } = req.params;
      const blog = await BlogRepo.getBlogById({ blogId });
      if (!blog) throw new NotFoundError("Not found blog");
      // Update view
      await blog
        .updateOne({
          $inc: {
            blog_numberViews: 1,
          },
        })
        .exec();
      return blog;
    }
  }

  static async likeBlogById(req, res) {
    const { blogId } = req.params;
    const { userId } = req.user;
    // Check blog is exist
    const blog = await BlogRepo.getBlogById({ blogId });
    if (!blog) throw new BadRequestError("Blog not found");
    // Check user has liked or dislike blog
    const userIdLikeBlog = blog.blog_likeByUsers.includes(userId);
    const userIdDislikeBlog = blog.blog_disLikeByUsers.includes(userId);
    // 1.If user hasn't liked blog and hasn't dislike blog
    if (!userIdLikeBlog && !userIdDislikeBlog)
      await blog
        .updateOne({
          $addToSet: { blog_likeByUsers: userId },
          $inc: { blog_numberLikes: 1 },
        })
        .exec();
    // 2.If user has disliked blog
    else if (userIdDislikeBlog)
      await blog
        .updateOne({
          $addToSet: { blog_likeByUsers: userId },
          $pull: { blog_disLikeByUsers: userId },
          $inc: { blog_numberLikes: 1, blog_numberDislikes: -1 },
        })
        .exec();
    // 3.If user has like blog
    else if (userIdLikeBlog)
      await blog
        .updateOne({
          $pull: { blog_likeByUsers: userId },
          $inc: { blog_numberLikes: -1 },
        })
        .exec();

    const blogUpdated = await BlogRepo.getBlogById({ blogId });
    return blogUpdated;
  }

  static async dislikeBlogById(req, res) {
    const { blogId } = req.params;
    const { userId } = req.user;
    // Check blog is exist
    const blog = await BlogRepo.getBlogById({ blogId });
    if (!blog) throw new BadRequestError("Blog not found");
    // Check user has liked or dislike blog
    const userIdLikeBlog = blog.blog_likeByUsers.includes(userId);
    const userIdDislikeBlog = blog.blog_disLikeByUsers.includes(userId);
    console.log("Dislike::::");
    console.log(userIdLikeBlog, userIdDislikeBlog);
    // 1.If user hasn't disliked blog and hasn't like blog
    if (!userIdDislikeBlog && !userIdLikeBlog)
      await blog
        .updateOne({
          $addToSet: { blog_disLikeByUsers: userId },
          $inc: { blog_numberDislikes: 1 },
        })
        .exec();
    // 2.If user has liked blog
    else if (userIdLikeBlog)
      await blog
        .updateOne({
          $addToSet: { blog_disLikeByUsers: userId },
          $pull: { blog_likeByUsers: userId },
          $inc: { blog_numberLikes: -1, blog_numberDislikes: 1 },
        })
        .exec();
    // 3.If user has dislike blog
    else if (userIdDislikeBlog)
      await blog
        .updateOne({
          $pull: { blog_disLikeByUsers: userId },
          $inc: { blog_numberDislikes: -1 },
        })
        .exec();

    const blogUpdated = await BlogRepo.getBlogById({ blogId });
    return blogUpdated;
  }

  static async updateBlogById(req, res) {
    const { blogId } = req.params;
    const payload = req.body;
    const blogUpdated = await BlogRepo.updateBlogById({ blogId, payload });
    if (!blogUpdated) throw new BadRequestError("Update blog error");
    return blogUpdated;
  }

  static async deletedBlogById(req, res) {
    const { blogId } = req.params;
    const blogUpdated = await BlogRepo.deletedBlogById({ blogId });
    if (!blogUpdated) throw new BadRequestError("Delete blog error");
    return blogUpdated;
  }
}

module.exports = BlogService;
