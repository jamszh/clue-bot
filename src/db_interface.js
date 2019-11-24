var Client = require('mysql');
require('dotenv').config();

var connection;
if (process.env.NODE_ENV == 'prd') {
	connection = Client.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
} else {
	connection = Client.createConnection({
		host: process.env.LOCAL_DB_HOST,
		user: process.env.LOCAL_DB_USER,
		password: process.env.LOCAL_DB_PASS,
		database: process.env.LOCAL_DB_NAME
	});
}

connection.connect((err) => {
	if (err) { 
		console.error('Error connecting...' + err.stack);
		return;
	}
	console.log('Thread ' + connection.threadId + ' connected to DB');
})


module.exports = class db_interface {

	getTableCount(table, level, callback) {
    /**
     * Return number of rows in table
     * @param table
     * @param level clue reward level
     * @param callback callback method
     */
		var query = 'SELECT COUNT(*) as c from ' + table + '_' + level;
		connection.query(query, (err, rows) => {
			if (err) {
				callback(null, err);
			} else {
				callback(rows[0].c);
			}
		});
	}

	queryBuilder(encoding, table_level) {
    /**
     * Build + consolidate the db query
     * @param encoding roller encoding
     * @param table_level level of clue
     */
		var queries = [];

		for (var key in encoding) {
			if (encoding[key] == 0) { continue; }

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

	execute(query) {
    /**
     * Execute DB queries
     * @param query
     */
		return new Promise((resolve, reject) => {
			connection.query(query, (err, rows) => {
				if (err) { reject(err); }
				resolve(rows);
			})
		})
	}
};