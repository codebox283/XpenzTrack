import jwt from 'jsonwebtoken'
import { User } from '../models/user.models'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'

const verifyJWT = asyncHandler( async (req, res, next) => {
    try {
        const accessToken = req.cookie?.accessToken || req.header('Authorization').replace('Bearer ', '')
        if(!accessToken) throw new ApiError(404, "unauthorization access")

        const decodedUser = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

        const user = await User.findById(decodedUser._id).select('-password -refreshToken')
        if(!user) throw new ApiError(404, "user not found during auth")

        req.user = user
        next()
        
    } catch (error) {
        throw new ApiError(400, "invalid access token for auth")
    }
})

export {verifyJWT}