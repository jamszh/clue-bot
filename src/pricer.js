var request = require("request");
var q = require('q');

// API base URL: 
// http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=


// Price fetching off osrs GE API
// Async!

module.exports = function(item_ID){

	var url = "http://services.runescape.com/m=itemdb_oldschool/api" 
			+ "/catalogue/detail.json?item=" + item_ID;
	var def = q.defer();

	request.get(url, (error, response, body) => {
		try{
			var json = JSON.parse(body);

			if (json === undefined){
				def.reject("Item ID incorrect!");
			}else{
				var value = json.item.current.price;
				def.resolve(value);
			}
		}catch(error){
			def.reject(error);
		}
	})
	return def.promise;    
}

