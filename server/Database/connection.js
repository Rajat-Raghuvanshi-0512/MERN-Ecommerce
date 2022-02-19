const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URI)
        if (data) {
            console.log(`Connected to ${data.connection.host} Database Successfully! 🏢`);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToMongo;