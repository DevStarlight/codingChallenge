const Store = require('../../store/mongo');
const e = require('../../helpers/errors');

const schema = 'Customer';

exports.list = list;
exports.get = get;
exports.post = post;
exports.update = update;
exports.remove = remove;

/**
 * Method that verifies if the customer exist or not
 * @param {Object} condition 
 */
function exist(condition) {
	return Store.query(schema, condition, {}, false).then(response => {
		return response ? true : false;
	});
}

/**
 * Method that return a list of customers
 */
function list(offset, limit) {
	if (offset && limit) {
		const statements = {
			select: 'name bags',
			skip: parseInt(offset),
			limit: parseInt(limit)

		};
		return Store.query(schema, {}, statements, true);
	}

	return Store.list(schema, {});
}

/**
 * Method that return a customer by its name if exist
 * @param {String} name The name of the customer  
 */
function get(name) {
	return exist({ name: name }).then(response => {
		if (!response) {
			throw e.error('CUSTOMER_NOT_EXIST');
		}
		return Store.query(schema, { name: name }, {}, false);
	});
}

/**
 * Method that post an user to the customer collection
 * @param {String} name The name of the customer 
 * @param {Number} bags The amount of bags
 */
function post(name, bags) {
	const query = {
		name: name,
		bags: bags
	};
	return Store.post(schema, query);
}

/**
 * Method that update a customer name or bags amount depending of its id
 * @param {String} customerId The id of the customer
 * @param {String} name The name of the customer
 * @param {Number} bags The amount of bags
 */
function update(customerId, name, bags) {
	let query = {};
	
	if (name) query.name = name;
	if (bags) query.bags = bags

	return exist({ id: customerId }).then(response => {
		if (!response) {
			throw e.error('CUSTOMER_NOT_EXIST');
		}
		return Store.upsert(schema, customerId, query, null);
	});
}

/**
 * Method that removes a customer from the collection if exists.
 * @param {String} customerId The id of the customer
 */
function remove(customerId) {
	const condition = { id: customerId };
	return exist(condition).then(response => {
		if (!response) {
			throw e.error('CUSTOMER_NOT_EXIST');
		}
		return Store.remove(schema, condition, false);	
	});
}