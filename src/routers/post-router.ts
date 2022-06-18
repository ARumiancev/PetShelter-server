import { Router } from 'express';
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post-contoller';
import { authMiddleware } from '../middlewares/auth-middlewares';

const postsRouter = Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPost);
postsRouter.post('/', authMiddleware, createPost);
postsRouter.patch('/:id', authMiddleware, updatePost);
postsRouter.delete('/:id', authMiddleware, deletePost);

export default postsRouter;
