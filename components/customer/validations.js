const Validations = require('../../helpers/validations');
const e = require('../../helpers/errors');

exports.get = get;
exports.post = post;
exports.update = update;
exports.remove = remove;

/**
 * Verify that GET method fit the model requirements
 * @param {String} name The name of the customer 
 */
function get(name) {
	return verifyName(name);
}

/**
 * Verify that POST method fit the model requirements
 * @param {String} name The name of the customer
 * @param {Number} bags The amount of bags the user has
 */
function post(name, bags) {
	return verifyName(name).then(() => {
		return verifyBags(bags);
	});
}

/**
 * Verify that PUT method fit the model requirements
 * @param {String} id The id of the customer
 * @param {String} name The name of the customer
 * @param {Number} bags The amount of bags the user has
 */
function update(id, name, bags) {
	let promises = [];
	
	if (name) promises.push(verifyName(name));
	if (bags) promises.push(verifyBags(bags));
	
	promises.push(verifyId(id));
	
	return Promise.all(promises);
}

/**
 * Verify that DELETE method fit the model requirements
 * @param {String} id The id of the customer
 */
function remove(id) {
    return verifyId(id);
}

/**
 * Validate that the id of the customer is defined and has a mongoose format
 * @param {String} id The id of the customer
 */
function verifyId(id) {
	return new Promise((resolve, reject) => {
		if (Validations.isUndefined(id)) {
			return reject(e.error('CUSTOMER_ID_NOT_DEFINED'));
		} else if (!Validations.isMongoose(id)) {
			return reject(e.error('CUSTOMER_ID_NOT_DEFINED'));
		}
		resolve();
	});
}

/**
 * Validate that the name of the customer has been defined, is string and is between 3 and 200 characters long
 * @param {String} name The name of the customer
 */
function verifyName(name) {
	return new Promise((resolve, reject) => {
		if (Validations.isUndefined(name)) {
			return reject(e.error('CUSTOMER_NAME_IS_REQUIRED'));
		} else if (!Validations.isString(name)) {
			return reject(e.error('CUSTOMER_NAME_IS_NOT_VALID'));
		} else if (!Validations.minLength(name, 3)) {
			return reject(e.error('CUSTOMER_NAME_IS_SHORTER'));
		} else if (!Validations.maxLength(name, 200)) {
			return reject(e.error('CUSTOMER_NAME_IS_LONGER'));
		}
		resolve();
	});
}

/**
 * Verify that bags is a defined number between 1 and 5 
 * @param {Number} bags The amount of bags the user has
 */
function verifyBags(bags) {
    return new Promise((resolve, reject) => {
		if (Validations.isUndefined(bags)) {
			return reject(e.error('CUSTOMER_BAGS_NOT_DEFINED'));
		} else if (!Validations.isNumber(bags) || !Validations.isPositiveNumber(bags) || bags <= 0 || bags > 5) {
			return reject(e.error('CUSTOMER_BAGS_NOT_VALID'));
		}
		resolve();
	});
}