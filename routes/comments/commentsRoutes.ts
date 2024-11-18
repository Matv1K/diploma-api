import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';

import CommentController from '../../controllers/commentsController';

const router = express.Router();

router.post('/:id', authMiddleware, CommentController.addComment);
router.get('/:id', CommentController.getComments);

export default router;
