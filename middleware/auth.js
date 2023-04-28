import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../model/User.js";

//Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
    let user = req.app?.locals?.user;
    if (!user) {
        return next(new ErrorResponse('Not authorized for these route', 401));
    }

    req.user = user;
    next();
});


//Grant Access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role: ${req.user.role} is not authorized to access this route`, 403)); //forbidden error
        }
        next();
    }
};
