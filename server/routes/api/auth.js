const router = require("express").Router();
const User = require("../../models/User");
const { generateToken, verifyToken } = require("../../utils/token");

router.get("/test", (req, res) => {
	res.send("test");
});

// signup
router.post("signup", async (req, res) => {
	const { name, password, email } = req.body;

	if (!email || !password) {
		return res
			.status(401)
			.json({ error: "You must provide email and/or password." });
	}

	const user = await User.findOne({ email });

	if (user) {
		return res.status(401).json({ error: "Email already taken." });
	}

	const newUser = new User({ name, password, email });

	const savedUser = await newUser.save();

	res.json({ token: generateToken(savedUser._id) });
});

// signin
router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(401)
			.json({ error: "You must provide email and/or password." });
	}

	const user = User.findOne({ email });

	if (!user) {
		return res.status(401).json({ error: "User not found." });
	}

	if (user.comparePassword(password)) {
		return res.status(401).json({ error: "Authentication Failed." });
	}

	res.json({ token: generateToken(user.id) });
});

module.exports = router;
