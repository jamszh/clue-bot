const Roller = require('./../src/roller');
const Builder = require('./../src/builder');
const DB = require('./../src/db_interface');

/*
 * Dummy test for BE
 * Initialise some constants
 */ 
const db = new DB();
const roller = new Roller();
const level = 'hard';
const data = roller.roll();

const query = db.queryBuilder(data, "hard");
db.execute(query).then(function(rows) {
    var builder = new Builder();

    builder.processResults(rows, roller).then((result) => {
      console.log(result);
      process.exit(22);
    });
});