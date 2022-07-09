const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
	},
});

Schema.pre("save", () => {
	const user = this;

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

Schema.methods.comparePassword = async (enteredPassword) => {
	const user = this;
	return await bcrypt.hash(enteredPassword, user.password);
};

module.exports = mongoose.model("user", Schema);
