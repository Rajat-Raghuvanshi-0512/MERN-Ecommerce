const express = require("express");
const app = express();
const path = require("path");


//Config path
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "server/Config/config.env" })
}


const product = require("./Routes/productRoutes");
const user = require("./Routes/userRoutes")
const order = require("./Routes/orderRoutes")
const cookieParser = require("cookie-parser")
const ErrorHandler = require("./Middleware/error")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const payment = require("./Routes/paymentRoutes")



app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


//Routes
app.use("/api", product)
app.use("/api", user)
app.use("/api", order)
app.use("/api", payment)

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})

app.use(ErrorHandler)


module.exports = app;