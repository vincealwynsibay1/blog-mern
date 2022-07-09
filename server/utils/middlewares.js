const { verifyToken } = require("./token");

const loginRequired = async (req, res, next) => {
	const token = req.header("token");

	if (!token) {
		return res
			.status(401)
			.json({ error: "No token, authorization not allowed" });
	}

	try {
		const decode = verifyToken(token, process.env.JWT_SECRET);

		if (!decode) {
			return res.status(401).json({ error: "Invalid Token" });
		}

		const user = await User.findById(decode.id);

		if (!user) {
			return res.status(401).json({ error: "User not found." });
		}

		req.user = user;
		next();
	} catch (err) {
		console.error("Something wrong with auth middleware");
		res.status(500).json({ message: "Server Error" });
	}
};

module.exports = { loginRequired };
