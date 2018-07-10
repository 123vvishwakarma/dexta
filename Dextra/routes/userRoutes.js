module.exports = function (app) {    
    app.get("/users/getUsers",require('../dextra/apis/dextraApis').getUsers);
};