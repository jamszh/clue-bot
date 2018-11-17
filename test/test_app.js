var Roller = require('./../src/roller');
// var Sanitiser = require('./../src/sanitiser');
// var formatter = require('./../src/formatter');
var Builder = require('./../src/builder');
var DB = require('./../src/db_interface');



// Initialise database interface instance
// var db = DB();

// result = require('dotenv').config();
// if (result.error) {
//     throw result.error
// }

// // Just a dummy initiate js file
// // Test the back-end without using reddit etc
var level = 'hard';
var roller = new Roller(level);
var data = roller.roll();

var db = new DB();

var query = db.queryBuilder(data, "hard");



var rows = db.execute(query).then(function(rows) {
    var builder = new Builder();
    var res = builder.processResults(rows).then(function(result) {
        console.log(result);
    });
    console.log("RES => " + String(res));
});

// Sanitiser(roller.roll()).then(function(data){
// 	var out = formatter(data);
// 	console.log(out);
// })


// process.exit(22);
