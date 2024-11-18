import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import LikedItemService from '../services/likedItem/likedItemService';

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

class LikedItemController {
  async createLikedItem(req: AuthenticatedRequest, res: Response) {
    try {
      const newLikedItem = await LikedItemService.addLikedItem(req.body, req.payload?.id);
      res.status(201).json(newLikedItem);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  async getLikedItems(req: AuthenticatedRequest, res: Response) {
    try {
      const likedItems = await LikedItemService.fetchLikedItems(req.payload?.id);
      res.status(200).json(likedItems);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  async checkLikedStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const isLiked = await LikedItemService.fetchLikedStatus(req.params.id, req.payload?.id);
      res.status(200).json(isLiked);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  async deleteLikedItem(req: AuthenticatedRequest, res: Response) {
    try {
      const deletedItem = await LikedItemService.removeLikedItem(req.params.id, req.payload?.id);
      res.status(200).json(deletedItem);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

export default new LikedItemController();
