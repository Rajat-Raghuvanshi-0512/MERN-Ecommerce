const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"
    if (err.name == "ValidationError") {
        err = new ErrorHandler(400, err.message);
    }
    if (err.name == "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(404, message);
    }
    res.status(err.statusCode).json({ error: err.message })
}
