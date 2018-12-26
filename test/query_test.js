var Client = require('mariasql');
require('dotenv').config();




c = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});





c.query('USE cluebot', function(err, rows) {
if (err)
	throw err;
});

arr = []

c.query('SELECT * FROM hard_common ORDER BY RAND() LIMIT 3', 
	function(err, rows) {
	for(var i = 0; i < rows.length; i++){
		arr.push(rows[i]);
	}

	console.log(arr);
if (err)
	throw err;
});




c.end();