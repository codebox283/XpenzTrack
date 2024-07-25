import { Category } from "../models/category.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const setCategory = asyncHandler(async(req, res) => {
    const userId = new  mongoose.Types.ObjectId(req.cookies?.ID)

    const user = await User.findById(userId)
    if (!user) throw new ApiError(404, "User not found")

    console.log(user);
})

export { setCategory }