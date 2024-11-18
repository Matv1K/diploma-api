import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator';

import User from '../models/User';

import UserService from '../services/user/userService';

import { ApiError } from '../types/index';

interface AuthenticatedRequest extends Request {
  payload?: { id: string };
}

const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`);

class UserController {
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.authenticateUser(email, password);

      res.status(200).json(user);
    } catch (error) {
      const apiError = error as ApiError;

      console.error('Could not login', error);

      if (apiError.message === 'User was not found' || apiError.message === 'Password is incorrect') {
        return res.status(400).json({ message: apiError.message });
      }

      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  async loginGoogleUser(req: Request, res: Response) {
    try {
      const { token: googleToken } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(401).json({ message: 'Invalid Google token' });
      }

      const { sub, email, name, picture } = payload;

      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          googleId: sub,
          email,
          name,
          picture,
        });

        await user.save();
      }

      const token = await UserService.generateAuthToken(user._id.toString());

      return res.status(200).json({ token, user });
    } catch (error) {
      console.error('Google login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { name, lastName, email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with such email already exists' });
      }

      if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
      }

      const newUser = await UserService.createUser(name, lastName, email, password);

      return res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.error('Could not register user:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.fetchAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Could not get users', error);
      res.status(500).json('Something went wrong');
    }
  };

  async getMyUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.payload?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
      }

      const user = await UserService.fetchUserById(userId);

      if (!user) {
        return res.status(404).json('User was not found');
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Could not get user', error);
      res.status(500).json('Something went wrong');
    }
  };

  async updateMyUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.payload?.id;

      if (!userId) {
        return res.status(500).json('User is not authenticated');
      }

      const updatedUser = await UserService.updateUserById(userId, req.body);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Could not update user', error);
      res.status(500).json('Something went wrong');
    }
  };

  async logoutUser(req: Request, res: Response) {
    try {
      res.status(200).json('Successfully logged out');
    } catch (error) {
      console.error('Could not sign out', error);
      res.status(500).json('Something went wrong');
    }
  };

  async resetPassword(req: AuthenticatedRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.payload?.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!(await bcrypt.compare(currentPassword, user?.password))) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long' });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Could not reset password', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async adminAccess(req: Request, res: Response) {
    res.status(200).json('Welcome Admin');
  };
}

export default new UserController();
