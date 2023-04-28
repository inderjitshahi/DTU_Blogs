import express from 'express';
import { getIndex, login, logout, signup } from '../controllers/auth.js';
import { body, query } from 'express-validator'  //Form validation

const router = express.Router();

router.get('/', getIndex);
router.get('/signup', (req, res, next) => res.render('auth/signup', { errors: [] }));
router.get('/login', (req, res, next) => res.render('auth/login', { errors: [] }));
router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
], login);
router.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
], signup)
router.get('/logout', logout);

export default router;