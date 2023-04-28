import asyncHandler from "../middleware/async.js";
import Comment from "../model/Comment.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createComment = asyncHandler(async (req, res, next) => {
    if (!req.app.locals?.user?.id) {
        return next(new ErrorResponse("Login To Comment"));
    }
    req.body.userId = req.app.locals.user.id;
    req.body.postId = req.params.postId;
    await Comment.create(req.body);
    return res.redirect(`/posts/${req.params.postId}`);
})