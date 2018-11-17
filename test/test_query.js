var Client = require('mariasql');
require('dotenv').config();
var clue_level = 'hard';



c = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

c.query('USE cluebot', function(err, rows) {
if (err)
	throw err;
});


/* 
 * Function that determines the rolls
 */
function roll(callback_a, callback_b) {

	// Number of items hardcoded for now
	var item_counts = [26, 108, 23, 21];

	// Set number of rolls (Dependent on difficulty) on common table
	var init_roll_count = 4;
	var threshold = 20;
	
	// Page table is seperate
	var table_names = ['pages', 'common', 'unique', 'super', '3a'];
	var roll_table = [0, init_roll_count, 0, 0, 0];
	var curr_idx = 1;

	for (var i = 0; i < init_roll_count; i++) {
		roll_val = Math.floor(Math.random() * threshold);

		if (roll_val == 0) {
			roll_table[curr_idx+1]++;
			roll_table[curr_idx]--;
		}
	}

	while (curr_idx < roll_table.length) {
		var rolls = roll_table[curr_idx];
		for (var i = 0; i < rolls; i++) {
			roll_val = Math.floor(Math.random() * item_counts[curr_idx-1]);

			if (roll_val == 0) {
				// Pages are at the 0th index, but are of greater value than common.
				// However rolls cannot be promoted from this page table
				promote_idx = curr_idx;

				if (curr_idx == 1) {
					promote_idx--;
				} else {
					promote_idx++;
				}
				roll_table[promote_idx]++;
				roll_table[curr_idx]--;
			}
		}
		curr_idx++;
	}

	// Complementary common rolls
	roll_table[1] += Math.floor(Math.random() * 2);

	var encoding = {};

	for (var i = 0; i < roll_table.length; i++) {
		encoding[table_names[i]] = roll_table[i];
	}
	callback_a(encoding, callback_b);
}

function queryBuilder(data) {
	for (var i = 0; i < data.length - 1; i++) {
		data[i] = '"' + data[i] + '"';
	}

	return 'SELECT * FROM items WHERE (level = "all" OR level = ' 
	+ data[0] + ') AND rarity = ' + data[1] + ' ORDER BY RAND() LIMIT ' + data[2]; 
}

/*
 * Function that executes the roll table encoding
 * Generates db queries
 */
function executeRolls(encoding, callback) {
	var result = [];
	for (key in encoding) {
		var query = queryBuilder([clue_level, key, encoding[key]]);

		a = c.query(query, function(err, rows) {
			for(var i = 0; i < rows.length; i++){
				result.push(rows[i]);
			}
			if (err)
				throw err;
		});
	}
	return result;
}

roll(executeRolls, viewArr);



function viewArr(arr) {
	if (typeof arr == 'undefined' || arr.length == 0)
		arr = 'empty'
	console.log("ITEMS => ")
	console.log(arr);
	console.log("~~~~~~~~~~~~~~~");
}