const CatchAsyncErrors = require("../Middleware/catchAsyncErrors")

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.processPayment = CatchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Shop Buddy"
        }
    })
    res.status(200).json({ success: true, client_secret: myPayment.client_secret })
})

exports.stripeApiKey = (req, res) => {
    res.status(200).json({ success: true, stripeApiKey: process.env.STRIPE_API_KEY })
}