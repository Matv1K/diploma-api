import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';
import roleMiddleware from '../../middlewares/roleMiddleware';

import { validateRegister } from '../../validators/registerValidator';

import UserController from '../../controllers/userController';

const router = express.Router();

router.post('/register', validateRegister, UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/googleSignIn', UserController.loginGoogleUser);
router.get('/', UserController.getAllUsers);
router.get('/my-user', authMiddleware, UserController.getMyUser);
router.patch('/my-user', authMiddleware, UserController.updateMyUser);
router.delete('/logout', authMiddleware, UserController.logoutUser);
router.post('/reset-password', authMiddleware, UserController.resetPassword);
router.get('/admin', roleMiddleware('admin'), UserController.adminAccess);

export default router;
