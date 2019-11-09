//Validation
const Joi = require('@hapi/joi');

//Sign Up Validation
const signUpValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }).required()
	});

	//Validation
	return schema.validate(data);
};

//Login validaiton
const logInValidation = (data) => {
	const schema = Joi.object({
		password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }).required()
	});

	//Validation
	return schema.validate(data);
};

module.exports.signUpValidation = signUpValidation;
module.exports.logInValidation = logInValidation;
