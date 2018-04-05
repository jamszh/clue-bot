var pricer = require('./pricer');
var Client = require('mariasql');
var q = require('q');

require('dotenv').config();

module.exports = class Roller {

	constructor(level){
		this.c = new Client({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS
		});

		this.c.query('USE cluebot', function(err, rows) {
		if (err)
			throw err;
		});
	}


	// Add random item to an item list
	add_rewards(list, items){
		var length = items.length;
		var rolled_element = items[Math.floor(Math.random() * length)];



		// STACKABLES, set random amount
		if(!(rolled_element instanceof Array)){

			if(this.container.includes(rolled_element.item)){
				switch(rolled_element.item){
					case 'Coins':
						rolled_element.freq = 420 + Math.floor(Math.random() * 9620);
						break;
					default:
						rolled_element.freq = 1 + Math.floor(Math.random() * 69);
						break;
				}
			}
		}

		while(rolled_element instanceof Array){
			rolled_element = rolled_element[Math.floor(Math.random() * rolled_element.length)];
		}

		list.push(rolled_element);
	}




	roll(){
		var reward_list = [];

		// Wildcards
		// -- How many times we roll each table

		// [0] - common
		// [1] - pages
		// [2] - rare/uniques
		// [3] - super rare
		// [4] - 3age

		var wildcards = [0, 0, 0, 0, 0];
		var pages = 0;
		var wildcard_level = ['common', 'unique', 'super', '3a'];

		// Hardcoded for now
		// 4 rolls for the rare drop table is used for hard clues
		var reward_level_wildcard_init = 4





		this.c.query('SELECT COUNT(*) as c from hard_common', function(err, rows) {

			if (err)
				throw err;


			num_items = rows[0].c;

			for(var i = 0; i < reward_level_wildcard_init; i++){
				// Treat wildcard as an extra row
				// Increase num_items by 2 (Pages and rare wildcard) ** DOESNT WORK???
				var roll = Math.floor(Math.random()*num_items);
				if(roll == 0){
					// Increment rare roll
					wildcards[2]++;
				}else if(roll == 1){
					// Increment page roll
					wildcards[1]++;
				}else{
					// Increment common roll
					wildcards[0]++;
				}
			}


			// Complementary common rolls (Up to 2)
			for(var i = 0; i < Math.floor(Math.random() * 2); i++){
				wildcards[0]++;
			}


		});



		// No wildcard for 3a drop table
		for(var i = 2; i < 4; i++){
			// Wildcard check
			if (wildcards[i] > 0){
				this.c.query('SELECT COUNT(*) as c from hard_' + wildcard_level[i], function(err, rows) {
					var num_items = rows[0].c;

					// Treat wildcard as an extra row
					// Increase num_items by 1 with value of 0 being wildcard
					// If wildcard hit, increment the array
					if(Math.floor(Math.random() * (num_items + 1)) == 0){
						wildcards[i+1]++;
					}
				if (err)
					throw err;
				});
			}			
		}

		// Roll items
		for(var i = 0; i < wildcards.length; i++){
			var num_rolls = wildcards[i];

			if(num_rolls > 0){
				this.c.query('SELECT * FROM hard_'
					+ wildcard_level[i] + ' ORDER BY RAND() LIMIT ' + num_rolls, function(err, rows) {
					for(var i = 0; i < num_rolls; i++){
						reward_list.push(row[i]);
					}
				});
			}
		}

		this.c.end();
		return reward_list;
	}
}