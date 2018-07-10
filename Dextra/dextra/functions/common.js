var request = require('request');
exports.googleDirectionFunc = function (data) {
	console.log("data : ",data);
	let err2 = 0;
	return new Promise((resolve, reject) => {
        if (data) {
        	console.log("inside data : ",data.googleLocation.loc.coordinates[0]);
        	console.log("inside data : ",data.googleLocation.loc.coordinates[1]);
        	let finalUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ data.googleLocation.loc.coordinates[1] + ',' + data.googleLocation.loc.coordinates[0];
			request({
				url: finalUrl,
				method: 'GET'
			}, function (error, response, body) {
				let err = 0, err1 = 0;
				if (error) {
					console.log("error : ",error);
					reject({ code: "UNEXPECTED_ERR", message: "Some error occured while getting data" , err : err++});
				} else if (body) {
					let responseData;
					var res = JSON.parse(body);
					if (typeof res.results[0] !== "undefined") {
						responseData = res.results[0].formatted_address;
					} else {
						responseData = "Not Address";
					}
					resolve(responseData);
				} else {
					console.log("error 1 : ",error);
					reject({ code: "DATA_NOT_FOUND", message: "Could Not find employee with that ID", err1 : err1++});
				}
			});
        } else {
            reject({ code: "INVALID_INPUT", message: "Please provied data", err : err2++});
        }
    })
	
}