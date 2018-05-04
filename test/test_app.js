var Roller = require('./../src/roller');
var Sanitiser = require('./../src/sanitiser');
var formatter = require('./../src/formatter');
var DB = require('./../src/db_interface');



// Initialise database interface instance
// var db = new DB();


// Just a dummy initiate js file
// Test the back-end without using reddit etc

var level = 'hard';
var roller = new Roller(level);


// Sanitiser(roller.roll()).then(function(data){
// 	var out = formatter(data);
// 	console.log(out);
// })


roller.roll();

