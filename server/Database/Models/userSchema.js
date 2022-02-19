const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot be greater than 30 characters"],
        minlength: [3, "Name must be atleast 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: [6, "Password must be atleast 6 characters"]
    },
    profilePhoto: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    passwordExpire: String

})

// Password hashing
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        console.log(err);
    }
})

// JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Compare password
userSchema.methods.matchPassword = async function (pass) {
    try {
        return await bcrypt.compare(pass, this.password)
    } catch (err) {
        console.log(err);
    }
}

// Generating password reset token
userSchema.methods.ResetPassword = function () {

    // Generating token
    const token = crypto.randomBytes(20).toString("hex");

    // Hashing and adding token to UserSchema 
    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    // Setting the password expire time to 15 mins
    this.passwordExpire = Date.now() + 15 * 60 * 1000;

    return token;
}

module.exports = mongoose.model("User", userSchema);