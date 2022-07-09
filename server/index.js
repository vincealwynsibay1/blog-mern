const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.get("/auth-ping", (req, res) => {
	res.send("authenticated pong");
});

app.use("/api/auth", require("./routes/api/auth"));

app.use((err, req, res, next) => {
	console.log("Error:", err.message);
	res.status(422).json(err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server running on port 5000");
});
