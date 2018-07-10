'use strict';
module.exports = function (app, mongoose, autoIncrement) {
	let usersSchema = mongoose.Schema({
		"firstName": { type: String },
		"lastName": { type: String },
		"status": { type: String },
		"updatedOn": { type: String },
		"createdOn": { type: String },
		"googleLocation": {
			"loc": {
				"coordinates": {
					type: [Number],
					index: '2d'
				}
			}
		}
	});

	usersSchema.index({ 'googleLocation.loc.coordinates': '2dsphere' });
	let users = mongoose.model('users', usersSchema);
	/*usersSchema.plugin(app.schema.autoIncrement.plugin, {
		model: 'users',
		field: '_id',
		startAt: '001',
		incrementBy: 1
	});*/
	app.schema.users = users;

};

