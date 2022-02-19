const app = require("./app")
const cloudinary = require("cloudinary")
const connectToMngo = require("./Database/connection")

//Config path
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "server/Config/config.env" })
}

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//Connecting to Database
connectToMngo();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server working 🔥");
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} 🔥`));


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});