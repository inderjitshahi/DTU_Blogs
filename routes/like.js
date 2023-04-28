import express from 'express';
import { createLike } from '../controllers/like.js';


const router = express.Router();

router.post('/:postId',createLike);

export default router;