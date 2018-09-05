const routes = server => {
	
	const component = function(name) { return '../components/' + name + '/network' };
	
	server.use('/customer', require(component('customer')));
};

module.exports = routes;