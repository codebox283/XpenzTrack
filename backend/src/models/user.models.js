import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    savingsGoals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavingsGoal'
    }],
    refreshToken:{
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(oldpass){
    return await bcrypt.compare(oldpass, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRY
            }
        )
    } catch (error) {
        console.log('error in generate access token: ', error)
    }
}

userSchema.methods.generateRefreshToken = async function() {
    try {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRY
            }
        )
    } catch (error) {
        console.log('error in generate access token: ', error)
    }
}

export const User = mongoose.model("User", userSchema)