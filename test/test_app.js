var Roller = require('./../src/roller');
var Sanitiser = require('./../src/sanitiser');
var formatter = require('./../src/formatter');

// Just a dummy initiate js file
// Test the back-end without using reddit etc

var level = 'hard';
var roller = new Roller(level);


// Sanitiser(roller.roll()).then(function(data){
// 	var out = formatter(data);
// 	console.log(out);
// })


for(var i = 0; i < 10000; i++){
	var out = roller.roll();
	console.log(out);
}

