const validator = require('validator');

exports.isUndefined = isUndefined;
exports.isEmail = isEmail;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isPositiveNumber = isPositiveNumber;
exports.isMongoose = isMongoose;
exports.isMobilePhone = isMobilePhone;
exports.minLength = minLength;
exports.maxLength = maxLength;

function isUndefined(value) {
	if (typeof value === "undefined") {
		return true;
	}
};

function isEmail(email) {
	if (validator.isEmail(email) === true) {
		return true;
	}
};

function isString(string) {
	if (typeof string === 'string') {
		return true;
	}
};

function isNumber(number) {
	if (!isNaN(number)) {
		return true
	}
};

function isArray(array) {
	if (Array.isArray(array) === true) {
		return true;
	}
};

function isObject(object) {
	if (typeof object === 'object') {
		return true;
	}
};

function isPositiveNumber(number) {
	if (number >= 0) {
		return true;
	}
};

function isMongoose(objectId) {
	if (typeof objectId !== 'String') {
		objectId = objectId.toString();
	}
	if (validator.isMongoId(objectId) === true) {
		return true;
	}
	return false;
};

function isMobilePhone(phone) {
	if (validator.isMobilePhone(phone, 'es-ES') === true) {
		return true;
	}
};

function minLength(string, minValue) {
	if (string.length >= minValue) {
		return true;
	}
};

function maxLength(string, maxValue) {
	if (string.length <= maxValue) {
		return true
	}
};
