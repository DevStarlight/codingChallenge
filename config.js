const config = {
	// Server port
	server_port: 3000,
	
	// Server environment
	node_env: 'development',
	
	// Database configuration
	mongodb_uri: 'mongodb://localhost:27017/bobcontest',
	
	// Winston 3rd party library
	logLevel: 'info',
};

module.exports = config;
