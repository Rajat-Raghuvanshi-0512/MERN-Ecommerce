const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product name"]
    },
    desc: {
        type: String,
        required: [true, "Please Enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
        maxLength: [7, "Price cannot exceed 7 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1,
        maxLength: [4, "Quantity cannot exceed 4 characters"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            }
        },
    ],
    totalReviews: {
        type: Number
    },
    addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("product", ProductSchema);