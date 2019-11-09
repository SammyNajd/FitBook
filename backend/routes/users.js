const router = require('express').Router();
const { signUpValidation, logInValidation } = require('../util/validation');
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
});

//UserAuth video uses async before (req,res), prob should look into what it does
//and why we need to use it
router.route('/add').post(async (req, res) => {
	//Validation
	const { error } = signUpValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	//Checking if user already exists, idk what await does but it was in the video
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res.status(400).send('Email already exists!');
	}

	//Hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	const username = req.body.username;
	const password = hashPassword;
	const email = req.body.email;

	const newUser = new User({ username, password, email });

	newUser.save().then(() => res.send({ user: newUser._id })).catch((err) => res.status(400).json('Error: ' + err));
});

//Login
router.route('/login').post(async (req, res) => {
	//Validation
	const { error } = logInValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	//Checking if user exists, idk what await does but it was in the video
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send('Email or password does not match!');
	}

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Email or password does not match!');

	//Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
});

module.exports = router;
