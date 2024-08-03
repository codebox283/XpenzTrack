import { User } from "../models/user.models.js";
import { Expense } from "../models/expense.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const setCategory = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.cookies?.ID)
    if (!userId) throw new ApiError(400, "User id is not valid")

    const categoryArray = ["Food", "Utilities", "Entertainment", "Transportation", "Miscellaneous"]

    const { amount, name, description } = req.body

    if(!name) throw new ApiError(401, "You must provide a name")

    if (!categoryArray.includes(name)) throw new ApiError(400, "Invalid category selected")

    // add expenses for category
    const expense = new Expense({
        amount,
        description,
        category: name,
        user: userId
    })

    const exp = await expense.save()
    // console.log("Expense check: ", exp);

    const user = await User.findByIdAndUpdate(
        userId,
        { $push: { expenses: exp._id } },
        { new: true }
    )

    return res.status(201)
    .json(
        new ApiResponse(201, user, "data saved successfully")
    )
})



export { setCategory }