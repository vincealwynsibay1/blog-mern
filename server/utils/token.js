const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign(id, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
	const decode = jwt.verify(token, process.env.JWT_SECRET);
	if (!decode) return null;

	return decode.id;
};

module.exports = { generateToken, verifyToken };
