const Roller = require('./src/roller');
const Builder = require('./src/builder');
const DB = require('./src/db_interface');

/*
 * Dummy test for BE
 * Initialise some constants
 */ 
const db = new DB();
const roller = new Roller();
const level = 'hard';

function test_end_to_end() {
  const data = roller.roll();
  const query = db.queryBuilder(data, "hard");
  db.execute(query).then(function(rows) {
      var builder = new Builder();
      builder.processResults(rows, roller).then((result) => {
        console.log(result);
        process.exit(22);
      });
  });
}

//function test_table_completion() {
//  var data;
//  var iter = 0;
//  while(true) {
//    data = roller.roll();
//    console.log(data);
//    iter++;
//    if (data['3a'] !== 0) {
//      console.log("NUM ROLLS => " + iter.toString());
//      break;
//    }
//  }
//}

// test_table_completion();
test_end_to_end();






