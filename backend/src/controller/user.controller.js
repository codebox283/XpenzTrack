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

        // console.log('accessToken', accessToken, 'refreshToken', refreshToken)

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

    const passwordValid = await user.isLoggin(password)
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
            $unset: {
                refreshToken: 1
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


const updatePassword = asyncHandler(async (req, res) => {
    // const { oldPassword, newPassword, confirmPassword } = req.body;

    // if (newPassword !== confirmPassword) throw new ApiError(401, 'Type same password! Please')

    // const user = await User.findById(req.user?._id)
    // if (!user) throw new ApiError(401, 'User not found')

    // const oldPasswordIsCorrect = await user.isPasswordCorrect(oldPassword);
    // console.log(oldPasswordIsCorrect)

    // if (!oldPasswordIsCorrect) throw new ApiError(401, 'Old password is incorrect')

    // user.password = newPassword;
    // console.log(user.password)
    // await user.save({ validateBeforeSave: true });

    // return res.status(200).json(
    //     new ApiResponse(200, user, "Password updated successfully")
    // )

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return next(error);
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email) throw new ApiError(401, 'Email not provided')
    if (newPassword !== confirmPassword) throw new ApiError(401, 'Type same password! Please')

    const user = await User.find({ email: email })
    console.log(user)
    if (!user) throw new ApiError(401, 'User not found')

    user.password = newPassword;
    await user.save({ validateBeforeSave: true });

    return res.status(200).json(
        new ApiResponse(200, user, "Password updated successfully")
    )
})

const updateProfileDeatils = asyncHandler(async(req, res) => {
    const {username, fullName} = req.body

    if([username, fullName].some((value) => {value.trim() === ''}))
    {
        throw new ApiError(403, 'Invalid credentials for update')
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username: username.toLowerCase(),
                fullName
            }
        },
        {
            new: true
        }
    ).select('-password -refreshToken')

    return res.status(200)
       .json(
            new ApiResponse(200, user, "successfully updated")
        )
})

export {
    registerUser, loginUser,
    logoutUser, updatePassword, forgotPassword,
    logoutUser,
    updateProfileDeatils
} 