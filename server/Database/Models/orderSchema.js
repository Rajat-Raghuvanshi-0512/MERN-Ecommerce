const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
    },
    orderedItems: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        product_id: {
            type: mongoose.Schema.ObjectId,
            ref: "product",
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        }
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing..."
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("orders", orderSchema);