import mongoose, { Schema } from "mongoose";

const expenseModel = new Schema({
    amount: {
        type: Number,
        required: true
    },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

export const Expense = mongoose.model('Expense', expenseModel)