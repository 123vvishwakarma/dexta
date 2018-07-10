
exports = module.exports = function (app, mongoose) {
	// Users Schemas
	require('./schemas/users/userSchema')(app, mongoose);
};