const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const Userdata = require("../models/user");
// const Comment = require("../models/comment");



// Register
router.post("/register", async (req, res) => {
	const { fullname, email, password } = req.body;
	if (password.length < 6) {
		res.render("register", { errors: "Password must be at least 6 characters!" });
	}
	try {
		await Userdata.create({
			fullname,
			email,
			hashPassword: await bcrypt.hash(password, 10),
		});
		res.redirect("/");
	}
	catch (err) {
		res.render("register", { errors: "Email already exist!" });
	}
});


// Login
router.post("/", async (req, res) => {
	const { email, password } = req.body;

	try {
		const userFromDB = await Userdata.findOne({ where: { email } });
		const isMatch = await bcrypt.compare(password, userFromDB.hashPassword);

		if (!userFromDB || !isMatch) {
			res.render("signin", { errors: "Invalid credential!" });
		} else {
			req.session.user = userFromDB.dataValues;
			res.redirect("/dashboard");
		}
	}
	catch (err) {
		res.render("signin", { errors: "Invalid credential!" });
	}
});


// route for user logout
router.get('/logout', (req, res) => {
	res.clearCookie('user_sid');
	res.redirect('/');
});


// Comment
router.post("/comment", async (req, res) => {
	try {
		await Comment.create({
			comment: req.body.comment,
			email: req.session.user.email,
			name: req.session.user.fullname,
		});

		res.redirect("/dashboard");
	}
	catch (err) {
		res.render("dashboard", { errors: "Something went wrong!" });
	}
});

module.exports = router;

