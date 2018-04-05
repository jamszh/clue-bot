var q = require('q');
var Client = require('mariasql');

require('dotenv').config();

var c = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

c.query('USE cluebot', function(err, rows) {
if (err)
	throw err;
});

module.exports = {

	// Return number of rows in table (i.e. number of items)
	getTableCount: function(table, level, callback){

		var query = 'SELECT COUNT(*) as c from ' + table + '_' + level;

		c.query(query, function(err, rows) {
			if (err){
				callback(null, err);
			}else{
				callback(rows[0].c);
			}
		});
	}
};