import mongoose, { Schema } from "mongoose";

const catergorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export const Category = mongoose.model('Category', catergorySchema)