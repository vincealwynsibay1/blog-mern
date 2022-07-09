const mongoose = require("mongoose");
require("dotenv").config();

module.exports = connectDB = () => {
	mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("DB Successfully Connected.");
		})
		.catch((err) => console.log(err.message));
};
