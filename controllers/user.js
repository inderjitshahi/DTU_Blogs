import User from "../model/User.js";
import asyncHandler from "../middleware/async.js";
import bcrypt from 'bcryptjs'

//@desc get all users
//@route GET '/users'
//Public
export const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.findAll();
    return res.render('user/users', {
        users: users,
        user: req.app.locals.user
    })
})


//@desc get single user
//@route GET '/users/:id'
//Public
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    return res.render('user/userDetails', {
        userDetails: user,
        user: req.app.locals.user,
        errors: []
    })
})


//@desc create users
//@route POST '/users'
//Private
export const createUsers = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create(req.body);
    // res.status(200).json({
    //     success: true,
    //     user  //not .toJSON()
    // })
})



//@desc update a user by id
//@route PUT '/users/:id'
//Private
export const updateUser = asyncHandler(async (req, res, next) => {
    if (req.body?.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    await User.update(req.body, {
        where: {
            id: req.params.id,
        }
    })
    return res.redirect('/');
    // const updatedUser = await User.findByPk(req.params.id);
    // res.status(200).json({
    //     success: true,
    //     data: updatedUser
    // })
})


//@desc delete single user by id
//@route DELETE '/users/:id'
//Private
export const deleteUser = asyncHandler(async (req, res, next) => {
    await User.destroy({
        where: {
            id: req.params.id,
        },

    })
    res.redirect('/users')
    // res.status(200).json({
    //     success: true,
    //     data: {}
    // })

})