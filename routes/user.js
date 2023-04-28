import express from 'express';
import {
    createUsers,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from '../controllers/user.js';
import { authorize, protect } from '../middleware/auth.js';


const router = express.Router();

router.route('/').get(protect,getUsers).post(createUsers);
router.post('/delete/:id',protect, authorize('admin'),deleteUser);
router.post('/update/:id',protect, authorize('admin'),updateUser);
router.get('/:id',protect, authorize('admin'),getUser);


export default router;