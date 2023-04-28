import asyncHandler from "../middleware/async.js";
import Comment from "../model/Comment.js";
import Like from "../model/Like.js";
import Post from "../model/Post.js";
import User from "../model/User.js";
import ErrorResponse from "../utils/errorResponse.js";


//@desc create post
//@route POST '/post'
//Private
export const createPost = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    req.body.userId = req.user.id;
    const user = await Post.create(req.body);
    res.redirect('/');
})


//@desc get all post
//@route GET '/posts'
//Public
export const getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.findAll({
        attributes: ['id', 'title', 'description'],
        include: {
            model: Like
        }
    });
    console.log(posts);
    return res.render('post/posts', {
        user: req.app.locals.user,
        posts,
    });
})

//@desc single post
//@route GET '/posts/:id'
//Public
export const getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findByPk(req.params.id, {
        include:
            {
                model: User,
                attributes: ['name']
            },
    });
    const comments=await Comment.findAll({
        where:{
            postId:req.params.id,
        },
        attributes:['content'],
        include:{
            model:User,
            attributes:['name']
        }
    })
    if (!post) {
        next(new ErrorResponse("Post Doesn't exists"), 404);
    }
    const likes = await post.countLikes();
    // console.log(likes);
    if (!post) {
        next(new ErrorResponse('No Such Post Exists', 404));
    }
    return res.render('post/postDetails', {
        user: req.app.locals.user,
        post,
        likes,
        comments
    });
})

//@desc Delete post
//@route Post '/posts/delete/:id'
//Private
export const deletePost = asyncHandler(async (req, res, next) => {
    await Post.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.redirect('/posts');
})
