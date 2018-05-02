module.exports = class Roller {

	constructor(level){
		this.level = level;
		this.common = require('./drop_tables/' + level + '/common');
		this.rare = require('./drop_tables/' + level + '/rare');

		// Container of items that are stackable in frequency
		this.container = [	'Lobster', 
							'Shark', 
							'Purple sweets', 
							'Law rune', 
							'Nature rune',
							'Blood rune',
							'Blue firelighter',
							'Red firelighter',
							'Green firelighter',
							'White firelighter',
							'Purple firelighter',
							'Coins'
						];
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

		// Chance of rares
		for(var i = 0; i < 4; i++){
			if(1 + Math.floor(Math.random() * 20) == 20){
				this.add_rewards(reward_list, this.rare);
			}else{
				this.add_rewards(reward_list, this.common);
			}
		}

		// Commons
		for(var i = 0; i < Math.floor(Math.random() * 2); i++){
			this.add_rewards(reward_list, this.common);
		}

		return reward_list;
	}
}