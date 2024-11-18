import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';

import CartController from '../../controllers/cartController';

const router = express.Router();

router.post('/', authMiddleware, CartController.addCartItem);
router.get('/', authMiddleware, CartController.getCartItems);
router.get('/amount', authMiddleware, CartController.getCartItemsAmount);
router.delete('/:id', authMiddleware, CartController.deleteCartItem);
router.patch('/decrease/:id', authMiddleware, CartController.decreaseCartItemAmount);
router.patch('/increase/:id', authMiddleware, CartController.increaseCartItemAmount);

export default router;
