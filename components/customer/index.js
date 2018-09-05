const Store = require('./store');
const Validate = require('./validations');
const e = require('../../helpers/errors');

exports.list = list;
exports.get = get;
exports.post = post;
exports.update = update;
exports.remove = remove;

/**
 * Method that return a list of customers
 */
function list() {
	return Store.list().then(customers => {
		return { data: customers };
	});
}

/**
 * Method that get a customer
 * @param {String} name The customer name
 */
function get(name) {
	return Validate.get(name).then(() => {
		return Store.get(name);
	}).then(customer => {
		return { data: customer };
	});
}

/**
 * Method that add to the collection a new customer
 * @param {Object} data The name of the customer and bags
 */
function post(data) {
	return Validate.post(data.name, data.bags).then(() => {
		return Store.post(data.name, data.bags);
	}).then(customer => {
		return { data: customer };
	});
}

/**
 * Method that update bags or the name of a valid customer
 * @param {String} customerId The id of the customer
 * @param {Object} data The name of the customer or a new bag amount
 */
function update(customerId, data) {
	return Validate.update(customerId, data.name, data.bags).then(() => {
		return Store.update(customerId, data.name, data.bags);
	}).then(() => {
		return { data: true };
	});
}

/**
 * Method that delete users
 * @param {String} customerId The id of the customer
 */
function remove(customerId) {
	return Validate.remove(customerId).then(() => {
		return Store.remove(customerId);
	}).then(() => {
		return { data: true };
	});
}