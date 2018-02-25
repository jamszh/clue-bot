var pricer = require('./pricer');

module.exports = class Roller {

	constructor(level){
		this.level = level;
		this.common = require('./drop_tables/' + level + '/common');
		this.rare = require('./drop_tables/' + level + '/rare');
	}

	add_rewards(list, items){
		var length = items.length;
		var rolled_element = items[Math.floor(Math.random() * length)];

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