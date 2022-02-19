const jwt = require("jsonwebtoken")
const User = require("../Database/Models/userSchema")

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Please login to access this resource" })
        }
        const data = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(data.id)
        next();
    } catch (err) {
        return res.status(500).json({ error: "Internal server error!" })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role == "admin") {
            return next();
        }
        return res.status(403).json({ message: "You cannot access this resource." })
    } catch (err) {
        return res.status(500).json({ error: "Internal server error!" })
    }
}