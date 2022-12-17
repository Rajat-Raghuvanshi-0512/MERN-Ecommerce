const Product = require("../Database/Models/productSchema");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

exports.addNewProduct = catchAsyncErrors(async (req, res) => {

    const { name, desc, price, category } = req.body;
    if (!name || !desc || !price || !category) {
        return res.status(400).json({ error: `Enter all the fields i.e name,desc,price,category` })
    }
    let images = [];

    if (typeof (req.body.images) === "string") {
        images = [req.body.images];
    } else {
        images = req.body.images;
    }

    req.body.images = []
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const result = await cloudinary.v2.uploader.upload(image, {
            folder: "products",
            width: 700,
            crop: "scale",
        })
        req.body.images.push({
            url: result.secure_url,
            public_id: result.public_id
        })
    }

    req.body.addedBy = req.user.id;

    const data = await Product.create(req.body);
    if (!data) {
        return res.status(400).json({ error: "Failed to create new product" })
    }
    return res.status(201).json({ success: true, data })

})

exports.getProducts = catchAsyncErrors(async (req, res) => {
    const ResultsPerPage = 8;
    const NumberOfDocuments = await Product.countDocuments();

    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter();
    let data = await apifeatures.query;

    const filteredProductsCount = data.length;
    apifeatures.page(ResultsPerPage);

    data = await apifeatures.query.clone();
    if (!data) {
        return res.status(400).json({ error: "Failed to fetch data" })
    }
    return res.status(200).json({ success: true, data, NumberOfDocuments, ResultsPerPage, filteredProductsCount })

})

exports.getAdminProducts = catchAsyncErrors(async (req, res) => {

    let products = await Product.find();

    if (!products) {
        return res.status(400).json({ error: "Failed to fetch data" })
    }
    return res.status(200).json({ success: true, products })

})

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
        return res.status(400).json({ error: "Failed to fetch data" })
    }
    return res.status(200).json({ success: true, product })

})

exports.updateProduct = catchAsyncErrors(async (req, res) => {

    const { name, desc, price, category } = req.body;
    if (!name || !desc || !price || !category) {
        return res.status(400).json({ error: `Enter all the fields i.e name,desc,price,category` })
    }

    let data = await Product.findById(req.params.id);
    if (!data) {
        return res.status(400).json({ error: "Failed to update product" })
    }
    if (req.body.images === undefined || req.body.images.length === 0) {
        req.body.images = data.images;
    } else {
        let images = [];
        if (typeof (req.body.images) === "string") {
            images = [req.body.images];
        } else {
            images = req.body.images;
        }
        let imageLinks = [];
        for (let i = 0; i < data.images.length; i++) {
            await cloudinary.v2.uploader.destroy(data.images[i].public_id);
        }
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
                width: 700,
                crop: "scale",
            })
            imageLinks.push({
                url: result.secure_url,
                public_id: result.public_id
            })
        }
        req.body.images = imageLinks;
    }
    await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return res.status(201).json({ success: true, status: "Successfully updated product" })

})

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    if (String(req.params.id).length < 24) {
        return res.status(400).json({ error: "Enter a valid id" })
    }
    const data = await Product.findById(req.params.id);
    if (!data) {
        return res.status(404).json({ error: "No such product exists" })
    }
    for (let i = 0; i < data.images.length; i++) {
        await cloudinary.v2.uploader.destroy(data.images[i].public_id);
    }
    await data.remove();
    return res.status(200).json({ success: true, status: "Successfully deleted product" })

})

exports.addReview = catchAsyncErrors(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;
    const name = req.user.name;
    if (!name || !rating) {
        return next(new ErrorHandler(400, "Please enter all the fields"))
    }
    const review = { name, rating, comment, userId }
    const product = await Product.findById(productId)

    if (!product) {
        return next(new ErrorHandler(404, "Product not found!"))
    }
    // Ckecking if user has already given a review and updating that only
    const isReviewed = product.reviews.find(rev => rev.userId.toString() === userId.toString())
    if (isReviewed) {
        product.reviews.forEach(Review => {
            if (Review.userId.toString() === userId.toString()) {
                Review.rating = rating
                Review.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review)
        product.totalReviews = product.reviews.length
    }

    // Calculating average rating    
    let sum = 0;
    product.reviews.forEach(rev => {
        sum += rev.rating
    })
    product.ratings = sum / product.totalReviews

    await product.save({ validateBeforeSave: false })
    return res.status(200).json({ success: true, status: "Successfully added review" })
})

// Get all reviews of a single product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.query
    const product = await Product.findById(id)
    if (!product) {
        return next(new ErrorHandler(404, "Product not found!"))
    }
    return res.status(200).json({ success: true, reviews: product.reviews })

})

// Delete your review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const { userId, productId } = req.query
    const product = await Product.findById(productId)
    if (!product) {
        return next(new ErrorHandler(404, "Product not found!"))
    }
    //This will return all the reviews except the particular user's review
    const reviews = product.reviews.filter(rev => rev.userId.toString() !== userId.toString())
    if (!reviews) {
        return next(new ErrorHandler(404, "This user never reviewed!"))
    }

    let sum = 0;
    reviews.forEach(rev => {
        sum += rev.rating
    })
    let ratings = 0;
    if (sum === 0) {
        ratings = 0
    } else {
        ratings = sum / reviews.length
    }
    const totalReviews = reviews.length

    await Product.findByIdAndUpdate(productId, { reviews, ratings, totalReviews }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({ success: true, message: "Sucessfully deleted review" })

})

//Get all products of a particular category
exports.getAllProductsOfCategory = catchAsyncErrors(async (req, res, next) => {
    const { category } = req.params
    const products = await Product.find({ category })
    if (!products) {
        return next(new ErrorHandler(404, "No products found!"))
    }
    return res.status(200).json({ success: true, products })
})