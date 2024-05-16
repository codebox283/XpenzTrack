import mongoose, { Schema } from 'mongoose'
// now bcrypt is deprecated so now we use argon2 for hashing and comparison passwords
// import bcrypt from 'bcrypt'
import argon from 'argon2'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
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
    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    //change bcrypt to argon2
    this.password = await argon.hash(this.password, { saltLength: 10 });
    next()
})

userSchema.methods.isLoggin = async function (oldpass) {
    //change bcrypt to argon2
    return await argon.verify(this.password, oldpass)
}

userSchema.methods.isPasswordCorrect = async function (oldpass) {
    //change bcrypt to argon2
    try {
        return await argon.verify(this.password, oldpass)
    } catch (error) {
        console.log('error in isPasswordCorrect: ', error)
    }
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

userSchema.methods.generateRefreshToken = async function () {
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