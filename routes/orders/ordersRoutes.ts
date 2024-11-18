import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';
import userMiddleware from '../../middlewares/userMiddleware';

import OrderController from '../../controllers/orderController';

const router = express.Router();

router.post('/', userMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, OrderController.getOrders);
router.post('/ordered', authMiddleware, OrderController.verifyOrderedItem);

export default router;
