import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(401, "Something went wrong while generating access and refresh Tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // alert("1"); 
    const  
    fullName = req.body.name,
    email = req.body.email, 
    phoneNumber = req.body.phoneNumber, 
    password  = req.body.password;

    if ([fullName, email, phoneNumber, password].some((field) => field.trim() === "")) {
        throw new ApiError(404, "Fill your credentials properly");
    }

    const userDetail = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (userDetail) {
        throw new ApiError(404, 'User already exists. Please Login!');
    }

    const user = await User.create({
        fullName,
        email,
        phoneNumber,
        password
    });

    if (!user) {
        throw new ApiError(404, 'Please register again. User not created.');
    }

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, 'User registered successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(401, 'Email not provided');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User with this email does not exist");
    }

    const passwordValid = await user.isLoggin(password);

    if (!passwordValid) {
        throw new ApiError(400, "Password Invalid");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const option = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "Logged In successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    ).select('-password');

    const option = {
        httpOnly: true,
        secure: true,
    };

    return res.status(200)
        .clearCookie('accessToken', option)
        .clearCookie('refreshToken', option)
        .json(
            new ApiResponse(200, user, "Successfully logged out")
        );
});

const updatePassword = asyncHandler(async (req, res) => {
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
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email) {
        throw new ApiError(401, 'Email not provided');
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError(401, 'Passwords do not match');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, 'User not found');
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, user, "Password updated successfully")
    );
});

const updateProfileDetails = asyncHandler(async (req, res) => {
    const { fullName, phoneNumber } = req.body;

    if ([fullName, phoneNumber].some((value) => value.trim() === '')) {
        throw new ApiError(403, 'Invalid credentials for update');
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: { fullName, phoneNumber } },
        { new: true }
    ).select('-password -refreshToken');

    return res.status(200)
        .json(new ApiResponse(200, user, "Successfully updated"));
});

export {
    registerUser,
    loginUser,
    updatePassword,
    forgotPassword,
    logoutUser,
    updateProfileDetails
};
