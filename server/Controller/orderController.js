const Order = require("../Database/Models/orderSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Product = require("../Database/Models/productSchema")

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    const order = await Order.create({
        shippingInfo,
        orderedItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user.id
    })
    return res.status(200).json({
        success: true,
        order
    })
})

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email",)
    if (!order) {
        return next(new ErrorHandler(404, "No such order exists"))
    }

    return res.status(200).json({
        success: true,
        order
    })
})

exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id })

    return res.status(200).json({
        success: true,
        orders
    })
})

// Admin route
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let total = 0;
    orders.forEach(order => total += order.totalPrice)

    return res.status(200).json({
        success: true,
        SubTotal: total,
        orders
    })
})

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {

    const { status } = req.body
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(404, "No such order exists"))
    }
    if (order.orderStatus.toLowerCase() == "delivered") {
        return next(new ErrorHandler(400, "You have already delivered this order."))
    }
    order.orderStatus = status
    if (status.toLowerCase() == "delivered") {
        order.deliveredAt = Date.now()
        order.orderedItems.forEach(async (o) => await UpdateStock(o.product_id, o.quantity))
    }

    await order.save({ validateBeforeSave: false })

    return res.status(200).json({
        success: true,
        message: "Status updated successfully!"
    })
})

const UpdateStock = async (id, qty) => {
    const product = await Product.findById(id);
    if (product.stock <= 0) {
        return next(new ErrorHandler(400, "Product out of stock"))
    }
    product.stock -= qty
    await product.save({ validateBeforeSave: false })
}

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new ErrorHandler(404, "No such order exists"))
    }

    return res.status(200).json({
        success: true,
        message: "Successfully deleted order!"
    })
})