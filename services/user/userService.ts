import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../../models/User';

import { UpdatedUserDataI } from '../../../types';

class UserService {
  async createUser(name: string, lastName: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      lastName,
      role: 'user',
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id, email: savedUser.email, role: savedUser.role },
      `${process.env.SECRET_KEY}`,
      { expiresIn: '30d' });

    return { user: savedUser, token };
  };

  async authenticateUser(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User was not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
      `${process.env.SECRET_KEY}`,
      { expiresIn: '30d' });

    return { user, token };
  };

  async fetchAllUsers() {
    const users = await User.find();
    return users;
  }

  async fetchUserById(userId: string) {
    const user = await User.findById(userId);
    return user;
  }

  async updateUserById(userId: string, data: UpdatedUserDataI) {
    const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
    return user;
  }

  async generateAuthToken(userId: string) {
    const token = jwt.sign({ id: userId }, `${process.env.SECRET_KEY}`, { expiresIn: '7d' });
    return token;
  }
}

export default new UserService();
