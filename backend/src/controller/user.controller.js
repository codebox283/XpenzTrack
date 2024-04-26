import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshTokens = (async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        console.log('accessToken', accessToken, 'refreshToken', refreshToken)

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(401, "something went wrong while generating access and refresh Tokens")
    }
})

const registerUser = asyncHandler(async (req, res) => {
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

    if (userdetail) throw new ApiError(404, 'User is already exists')

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    })

    if (!user) throw new ApiError(404, 'please register again user not created......!')

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, 'user register successfully.....'))

})

const loginUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body;
    // console.log(username, email);

    if (!username || !email) throw new ApiError(401, 'Username or email Invalid')

    const user = await User.findOne(
        {
            $or: [{ email }, { username }]  // search by both fields
        }
    )

    // console.log(user)

    if (!user) throw new ApiError(400, "email or usename does not exist")

    const passwordValid = await user.isPasswordCorrect(password)
    console.log(passwordValid);
    if (!passwordValid) throw new ApiError(400, "Password Invalid")


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "Logged In successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    ).select('-password')

    const option = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .clearCookie('accessToken', option)
    .clearCookie('refreshToken', option)
    .json(
        new ApiResponse(200, user, "successfully logout")
    )
})

export {
    registerUser, loginUser,
    logoutUser
} 