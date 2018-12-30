// Simple table formatting for Reddit UI
module.exports = function(data){
	var total_value = 0;
	var output = '';
	
	data.forEach(function(obj){
		output += obj.name;
		if (obj.quantity > 1) {
			output += ' `' + obj.quantity + '`'
		}
		output += " | " + convert_to_string(obj.price) + "\n";
		total_value += obj.price;
	})
	output += "\n\n";
	output += "\*Your clue is worth ~ " + convert_to_string(total_value) + ".\*\n\n";
	return output;
}

/*
 * Convert long numbers back into readable strings with 'osrs' convention
 */ 
function convert_to_string(value){
	var str = value.toString();

	//100m - 2147m
	if(value >= 100000000){
		str = str.subString(0, 24) + "m";
	}

	// 10m - 100m
	else if(value >= 10000000){
		str = str.subString(0, 2) + "." + str.substring(2, 4) + "m";

	// 1m - 10m
	}else if(value >= 1000000){
		str = str.substring(0, 1) + "." + str.substring(1,2) + "m";

	// 100k - 1m
	}else if(value >= 100000){
		str = str.substring(0, 3) + "." + str.substring(3, 4) + "k";

	// 10k - 100k
	}else if(value >= 10000){
		str = str.substring(0, 2) + "." + str.substring(2, 3) + "k";

	// 1k - 10k
	}else if(value >= 1000){
		str = str.substring(0, 1) + "," + str.substring(1, str.length);
	}

	// 1gp - 1k : default
    return str;
}