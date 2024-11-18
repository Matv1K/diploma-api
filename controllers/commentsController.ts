import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import CommentService from '../services/comments/commentService';

import { ApiError } from '../../types';

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

class CommentController {
  async addComment(req: AuthenticatedRequest, res: Response) {
    try {
      const { description, rating } = req.body;
      const { id: instrumentId } = req.params;

      const userId = req.payload?.id;

      const newComment = await CommentService.addComment(userId!, instrumentId, description, rating);

      res.status(201).json(newComment);
    } catch (error) {
      const apiError = error as ApiError;

      console.error('Something went wrong', error);
      res.status(500).json({ message: apiError.message });
    }
  }

  async getComments(req: Request, res: Response) {
    try {
      const { id: instrumentId } = req.params;

      const comments = await CommentService.getComments(instrumentId);

      res.status(200).json(comments);
    } catch (error) {
      const apiError = error as ApiError;

      console.error('Something went wrong', error);
      res.status(500).json({ message: apiError.message });
    }
  }
}

export default new CommentController();
