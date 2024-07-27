import mongoose, { Schema } from "mongoose";

const SavingsGoalModel = new Schema({
    name: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    targetDate: Date,
    color:{
        type: String,
        required: true,
        enum: ['Red', 'Green', 'Yellow', 'Blue']
    },
    expired:{
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export const SavingsGoal = mongoose.model('SavingsGoal', SavingsGoalModel)