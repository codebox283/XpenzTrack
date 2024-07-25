import mongoose, { Schema } from "mongoose";

const catergorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ["Food", "Utilities", "Entertainment", "Miscellaneous", "Transportation"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export const Category = mongoose.model('Category', catergorySchema)