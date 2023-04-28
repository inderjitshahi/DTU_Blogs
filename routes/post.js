import express from 'express';
import { createPost, deletePost, getPost, getPosts } from '../controllers/post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect,createPost).get(getPosts);
router.get('/createPost',protect,(req,res,next)=>res.render('post/createPost',{user:req.app.locals.user,errors:[]}));
router.post('/delete/:id',deletePost)
router.get('/:id',getPost);
export default router;