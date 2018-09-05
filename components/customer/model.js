const model = {
	name: {
		type: 'String',
		length: {
			min: 3,
			max: 200
		},
        trim: true,
		required: true,
		index: true
	},
	bags: {
		type: 'Number'
	}
};

module.exports = {
	model: model
};