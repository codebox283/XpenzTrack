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

    if (!name) throw new ApiError(401, "You must provide a name")

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

const deleteExpense = asyncHandler(async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.cookies?.ID)
        if (!userId) throw new ApiError(400, "User id is not valid during delete expense")

        const expenseId = new mongoose.Types.ObjectId(req.params.id)

        // check for valid expense id
        if (!mongoose.Types.ObjectId.isValid(expenseId)) throw new ApiError(400, "invalid expense ID")

        const user = await User.findById(userId)

        // filter from the expense array and set it to user model
        const expenseArray = user.expenses.filter(expense => !expense.equals(expenseId));
        user.expenses = expenseArray
        await user.save()


        // console.log(user);
        
        await Expense.findOneAndDelete(expenseId)

        return res.status(200).json(
            new ApiResponse(200, user, "expense deleted successfully")
        )


    } catch (error) {

        console.log("Error while deleting expense: ", error);

        return;
    }
})


export { setCategory, deleteExpense }