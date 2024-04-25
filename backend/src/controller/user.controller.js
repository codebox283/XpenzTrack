import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"


const registerUser = asyncHandler( async (req, res) => {
    const { fullName, username, email, password } = req.body
    // console.log(fullName, username)

    if ([fullName, username, email, password].some((field) => {
        field?.trim() === ""
    })) {
        throw new ApiError(404, "fill your credentials properly")
    }

    const userdetail = await User.findOne({
        $or: [
            { email }, { username }
        ]
    })

    if(userdetail ) throw new ApiError(404, 'User is already exists')

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    })

    if(!user) throw new ApiError(404, 'please register again user not created......!')

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    return res
    .status(200)
    .json(new ApiResponse(200, createdUser, 'user register successfully.....'))

})

export {
    registerUser
} 