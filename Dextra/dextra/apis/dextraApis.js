const events = require('events');
const async = require('async');
const redis = require('redis');
const client = redis.createClient();

// localhost:8080/users/getUsers?page=1&pageSize=10&search=Anu
// This Api returns the users Details and if page and pagesize is not send by client  than it will return maximum of default page= 1 and pageSize =10 
// search is implemented on status, createdOn and updatedOn.
exports.getUsers = function (req, res) {
	let eventEmitter = new events.EventEmitter();
	let query;
	if (typeof req.query.search !== "undefined") {
		let regex = req.query.search;
		console.log("Regex : ",req.query.search);
		query = {
				$or: [{
						"status": regex
					},
					{
						"updatedOn": {$gte : regex}
					},
					{
						"createdOn": {$gte : regex}
					}
				],
			};
	} else {
		console.log("data : ");
		query = {}
	}
	let page = parseInt(req.query.page) || 1; //if page number not defined use 1 as page number
	let pageSize = parseInt(req.query.pageSize) || 10; //if page size is not defined use 10 as page size
	let start = (page - 1) * pageSize; //calc the documnets to be skipped
	let limit = parseInt(pageSize); //number of docs to limit to
	let skip = start;

	let collection = req.app.schema.users;
	let selection = {};
	let sort = {
		'createdOn': -1
	};

	let populateDoc = "";

	eventEmitter.on('getUsersDetails', function () {
		req.app.crud.getAllSortSkipLimit(query, collection, selection, populateDoc, sort, skip, limit, req.app, function (err, driverDoc) {
			if (err) {
				console.log("Error in finding users doc: ",err);
				res.status(500).json({
					message: "error",
					data: {},
					res: false
				});
			} else if (driverDoc.length > 0) {
				let finalJsonArray = [];
				async.forEach(driverDoc, function (data, callback) {
					if (typeof data !== "undefined") {
						req.app.common.googleDirectionFunc(data)
						.then((googleAddress) => {
							let jsonObj = {};
							jsonObj.googleLocation = {};
							console.log("Google address : ",googleAddress);
							jsonObj._id = data._id;
							jsonObj.googleLocation = data.googleLocation;
							jsonObj.firstName = data.firstName;
							jsonObj.lastName = data.lastName;
							jsonObj.status = data.status;
							jsonObj.updatedOn = data.updatedOn;
							jsonObj.createdOn = data.createdOn;
							jsonObj.googleLocation.formattedAddress = googleAddress;
							finalJsonArray.push(jsonObj);
							callback();
						})
						.catch((err) => {
							if (err.code == "DATA_NOT_FOUND" || err.code == "INVALID_INPUT") {
								console.log("data not found");
								if (err.err1 == 1 || err.err == 1) {
									return res.status(200).json({
										message: err.message,
										data: {},
										res: false
									});
								}
							} else {
								if (err.err2 == 1) {
									return res.status(500).json({
										message: err.message,
										data: {},
										res: false
									});
								}
							}
						});
					}
				}, function (err) {
					if (err) {
						console.log("Error in inner async");
					} else {
						console.log("Successfully getting");
						res.status(200).json({
							message: "Success",
							data : finalJsonArray.sort(function(a,b){ 
							    var x = a.createdOn > b.createdOn? -1:1; 
							    return x; 
							}),
							res: true
						});
					}
				});

			} else {
				res.status(200).json({
					message: "No Record Found",
					data: {},
					res: false
				});
			}
		});

	})

	eventEmitter.emit('getUsersDetails');
};