var Roller = require('./../src/roller');
// var Sanitiser = require('./../src/sanitiser');
// var formatter = require('./../src/formatter');
var Builder = require('./../src/builder');
var DB = require('./../src/db_interface');


// // Just a dummy initiate js file
// // Test the back-end without using reddit etc
var level = 'hard';
var roller = new Roller(level);
var data = roller.roll();

var db = new DB();

var query = db.queryBuilder(data, "hard");

db.execute(query).then(function(rows) {
    var builder = new Builder();

    builder.processResults(rows).then((result) => {
      console.log(result);
      process.exit(22);
    });
});

db.execute(query);

