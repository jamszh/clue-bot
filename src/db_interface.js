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

module.exports = class db_interface {


	// Return number of rows in table (i.e. number of items)
	getTableCount(table, level, callback) {

		var query = 'SELECT COUNT(*) as c from ' + table + '_' + level;

		c.query(query, function(err, rows) {
			if (err){
				callback(null, err);
			}else{
				callback(rows[0].c);
			}
		});
	}

	/*
	 * Build query
	 */
	queryBuilder(encoding, table_level) {
		var queries = [];

		for (var key in encoding) {
			if (encoding[key] == 0)
				continue;

			var outer_select = 'SELECT * FROM ('
			var level = '"' + table_level + '"';
			var rarity = '"' + key + '"';

			for (var i =  0; i < encoding[key]; i++) {
				var outer_select_close = ') ' + String(key + encoding[key]) + String(i);

				queries.push(
					outer_select + 
					'SELECT * FROM items WHERE (level = "all" OR level = ' +
					level + ') AND rarity = ' + rarity + ' ORDER BY RAND() LIMIT 1 ' + 
					outer_select_close
				);
			}
		}
		var combined_query = queries.join(" UNION ALL ");
		return combined_query;
	}

	/*
	 * Method that executes the roll table encoding
	 * Generates db queries
	 */
	execute(query) {
		return new Promise((resolve, reject) => {
			c.query(query, function(err, rows) {
				if(err)
					return reject(err);
				resolve(rows);
			})
		})
	}
};