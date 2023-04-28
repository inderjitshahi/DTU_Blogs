import { render } from "ejs";
import asyncHandler from "../middleware/async.js";
import { validationResult } from 'express-validator'
import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import Post from "../model/Post.js";
import Like from "../model/Like.js";


//@desc check login, or redirect to home
export const getIndex = asyncHandler(async (req, res, next) => {
    const posts = await Post.findAll({
        attributes: ['id', 'title', 'description'],
        include: {
            model: Like
        }
    });
    res.render('index', {
        user: req.app.locals.user,
        posts
    })
})


//@desc login user
//url POST /login
export const login = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', {
            errors: errors.errors,
        })
    }
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        return res.render('auth/login', {
            errors: [{ msg: "User doesn't exists" }],
        })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.render('auth/login', {
            errors: [{ msg: "Invalid Credentials" }],
        })
    }
    req.app.locals.user = user.toJSON();
    res.redirect('/');
})


//@desc logout user
//url POST /logout
export const logout = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    req.app.locals.user = undefined;
    res.redirect('/');
})

//@desc logout user
//url POST /logout
export const signup = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.render('auth/signup', {
            errors: errors.errors,
        })
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create(req.body);
    req.app.locals.user = user.toJSON();
    res.redirect('/');
})