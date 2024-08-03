import mongoose, { Schema } from "mongoose";

const expenseModel = new Schema({
    amount: {
        type: Number,
        required: true
    },
    description: String,
    category:{
        type: String,
        required: true,
        enum: ["Food", "Utilities", "Entertainment", "Transportation", "Miscellaneous"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

export const Expense = mongoose.model('Expense', expenseModel)