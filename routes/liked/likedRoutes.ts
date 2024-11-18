import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';

import LikedItemController from '../../controllers/likedItemController';

const router = express.Router();

router.post('/', authMiddleware, LikedItemController.createLikedItem);
router.get('/', authMiddleware, LikedItemController.getLikedItems);
router.get('/:id', authMiddleware, LikedItemController.checkLikedStatus);
router.delete('/:id', authMiddleware, LikedItemController.deleteLikedItem);

export default router;
