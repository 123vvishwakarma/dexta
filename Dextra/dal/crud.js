
// Function to insert document 
exports.createDocument = async function (toSaveDoc, collection,callback) {
		let res = new collection(toSaveDoc);
		await res.save().then((doc) => { 
			callback("",doc);
		})
		.catch((e) => {
			callback(e, "");
		});
};
// Function to update document

exports.updateDocument = function (query, toUpdateDoc, collection, options, populateDoc, app, callback) {
	options.new = true;
	collection.findOneAndUpdate(query, toUpdateDoc, options).populate(populateDoc).exec(function (err, doc) {
		if (err) {
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};


// Function to get document

exports.getOneDoc = function (query, collection, selection, populateDoc, app, callback) {
	collection.findOne(query, selection).populate(populateDoc).exec(function (err, doc) {
		if (err) {
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

// Function to get document

exports.getAll = function (query, collection, selection, populateDoc, app, callback) {
	collection.find(query, selection).populate(populateDoc).lean().exec(function (err, doc) {
		if (err) {
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

//  Function to get Data using sort, skip and limit
exports.getAllSortSkipLimit = async function (query, collection, selection, populateDoc, sorting, skip, limits, app, callback) {
	await collection.find(query, selection).populate(populateDoc).sort(sorting).skip(skip).limit(limits).lean().then((doc) => {
		callback("",doc);
	})
	.catch((e) => {
		callback(e, "");
	});
};
