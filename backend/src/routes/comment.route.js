const express = require('express');
const router = express.Router();
const { CommentController } = require('../controllers');
const { authentication } = require('../middleware/auth.middleware');

router.use(authentication);
router.route('/create').post(CommentController.createComment);
router
  .route('/getByProductId/:productId')
  .get(CommentController.getCommentByProductId);
router
  .route('/getByParentId/:productId/:commentId')
  .get(CommentController.getCommentByParentId);
router
  .route('/delete/:productId/:commentId')
  .delete(CommentController.deleteComment);
router
  .route('/deleteByProductId/:productId')
  .delete(CommentController.deleteCommentByProductId);

module.exports = router;
