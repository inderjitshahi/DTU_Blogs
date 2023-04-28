import asyncHandler from "../middleware/async.js";
import Like from "../model/Like.js";
import ErrorResponse from "../utils/errorResponse.js";


//@desc create like
//@route POST '/likes/:postId'
//Private
export const createLike = asyncHandler(async (req, res, next) => {
    if (!req.app.locals.user) {
        next(new ErrorResponse('Please Login to Like'))
    }
    const liked=await Like.findOne({
        where:{
            postId:req.params.postId,
            userId:req.app.locals.user.id,
        }
    })
    if(liked){
        await liked.destroy();
        return res.redirect(`/posts/${req.params.postId}`);
    }
    await Like.create({
        userId: req.app.locals.user.id,
        postId: req.params.postId,
    });
    res.redirect(`/posts/${req.params.postId}`)
})