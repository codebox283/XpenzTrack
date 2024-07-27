import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SavingsGoal } from "../models/savingsGoal.models.js";
import mongoose from "mongoose";

const setGoal = asyncHandler(async (req, res) => {
    try {
        const userId = req.cookies?.ID;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new ApiError(404, "Invalid userId for setGoal");
        }

        const { name, targetAmount, currentBalance, targetDate, color } = req.body;

        const validColors = ['Red', 'Green', 'Yellow', 'Blue'];
        if (!validColors.includes(color)) {
            throw new ApiError(400, "Invalid color for setGoal");
        }

        // Assuming you want to save a savings goal, you should create and save it here
        const tarDate = new Date(targetDate)
        const currentDate = new Date()

        const daysleft = tarDate - currentDate

        const savingsGoal = new SavingsGoal({
            user: new mongoose.Types.ObjectId(userId),
            name,
            targetAmount,
            currentBalance,
            targetDate,
            color,
            expired: Math.ceil(daysleft / (1000 * 60 * 60 * 24)) >= 0 ? false : true
        });

        await savingsGoal.save();

        const user = await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(userId),
            {
                $push: { savingsGoals: savingsGoal._id }
            },
            {
                new: true
            }
        )

        return res.status(201).json(
            new ApiResponse(201, user, "Goal saved successfully")
        );

    } catch (error) {
        console.error(error);
        throw new ApiError(401, "An error occurred during setGoal");
    }
});

export {setGoal}