const fs = require('fs');
const JSONStream = require('JSONStream');
const eventStrream = require('event-stream');

module.exports = function (app) {
    // on start of server read the file in chunks and create document in database
    let getStream = function () {
        let dataObj = '/Dextra/file/users.json';
        let readStreamObj = fs.createReadStream(dataObj, { encoding: 'utf8' });
        let parser = JSONStream.parse('*');
        return readStreamObj.pipe(parser);
    };
    var i = 1;
    getStream().pipe(eventStrream.map(data => {
        let collection = app.schema.users;
        
        if (data.googleLocation.loc.coordinates[0] != null && data.googleLocation.loc.coordinates[1] != null) {
            app.crud.createDocument(data, collection, function(err, doc) {
                if(err){
                    console.log("Error in saving doc : ",err)
                }else{
                    console.log("Doc inserted");
                }
            });
        } else {
            console.log("Cordinates is null ===== ",i++);
        }
    }));  
}