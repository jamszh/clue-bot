var items = require('./drop_tables/hard/super_rare');

 var fs = require("fs");
 console.log("\n *STARTING* \n");
 var contents = fs.readFileSync("items.json");
 var jsonContent = JSON.parse(contents);


var keys = Object.keys(jsonContent);

for(var o = 0; o < items.length; o++){
	for(var i = 0; i < keys.length; i++){
		var key = keys[i];

		if(items[o].item === jsonContent[key].name){
			items[o].id = key;
			break;
		}

	}
}

console.log(items);

