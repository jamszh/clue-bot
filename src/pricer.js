const request = require("request");

/*
 * Price fetching off osrs GE API (Async)
 * API base URL: 
 * http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=
 */
module.exports = function(item) {
	var item_ID = item.id;
	var url = "http://services.runescape.com/m=itemdb_oldschool/api" 
			+ "/catalogue/detail.json?item=" + item_ID;

	return new Promise((resolve, reject) => {
		request.get(url, (error, response, body) => {
			try {
				var json = JSON.parse(body);
	
				if (json === undefined){
					reject("Item ID incorrect!");
				}else{
					var value = json.item.current.price;

					if(typeof value === 'string' || value instanceof String){
						value = convert_to_dec(value);
					}

					// Calculate item valuation
					value = value * item.quantity;
					value = convert_to_string(value);

					resolve(value);
				}
			} catch(error) {
				console.log('failed on => ' + url);
				reject(error);
			}
		})
	})  
}

/*
 * Convert osrs convention into numerical values
 * API uses this ridiculous (string/integer) convention for some reason
 */
function convert_to_dec(str){

	var k_reg = new RegExp(/.*?k$/);
	var m_reg = new RegExp(/.*?m$/);
	var c_reg = new RegExp(/[0-9]+?,[0-9]+/);

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

