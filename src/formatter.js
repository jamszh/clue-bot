// Simple table formatting for Reddit UI
module.exports = function(data){
	var total_value = 0;
	var output = '';
	
	data.forEach(function(obj){
		output += obj.name + ' `' + obj.quantity + '`';
		output += " | " + obj.price + "\n";
		total_value += convert_to_dec(obj.price);
	})
	output += "\n\n";
	output += "\*Your clue is worth ~ " + convert_to_string(total_value) + ".\*\n\n";
	return output;
}

/*
 * TODO remove this as it is a duplicate of the method in pricer
 * Convert osrs convention into numerical values
 * API uses this ridiculous (string/integer) convention for some reason
 */
function convert_to_dec(str){

	const k_reg = new RegExp(/.*?k$/);
	const m_reg = new RegExp(/.*?m$/);
	const c_reg = new RegExp(/[0-9]+?,[0-9]+/);

	var value;

	switch(true){
		case k_reg.test(str):
			value = Number(str.replace('k','')) * 1000;
			break;
		case m_reg.test(str):
			value = Number(str.replace('m','')) * 1000000;
			break;
		case c_reg.test(str):
			value = Number(str.replace(',',''));
			break;
		default:
			value = Number(str);
			break;
	}
	return value;
}

/*
 * Convert long numbers back into readable 'osrs' convention
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