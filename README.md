# dexta
Dextra api

Installing : 
	* Mongodb 
	* Nodejs
	* Express framework // using npm install express
	* Redis server 
Created project : 
	1 . Run npm init command which create the package.json file where our all module is there.
	2 . Install express framework for proving routing and middleware for creating our apis.
	3 . Install all npm module whichever in need to create the assignment.
	4 . Run mongodb and redis server
	5. Start creating the apis and assignment.

Part 1 : First i have install all the npm module which i needed and after the i have created the server and connected the mongodb databaser and redis server and when i run 	 the server my script file is run where i have reading the file by json object and store in mongodb database async reading the file by json for that i have used 	 	 JSONStram and event-stream npm module.
	 const JSONStream = require('JSONStream');
	 const eventStrream = require('event-stream');
	 Install npm :
	  npm install <name of the module>

Part 2 : I have created the api which is paginated we can retrieve the  documents and and parellel i am hitting the google api which return the address of releted lat and          long and send to the response and this api can filter by updateOn, createdOn and status if you not filter any thing it can response that documents and it is          sorted order by createdOn field.
readme.txt
Displaying readme.txt.
