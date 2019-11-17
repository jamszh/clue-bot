const ItemObj = require('./item_obj');

/*
 * Create a set of items (Dupes removed and quantities handled accordingly)
 * Return an array of distinct items
 */
module.exports = function(input, roller){
	var distinct = {};

	input.forEach(element => {

		var quantity = 1;

		if (element.stackable == 1)
			quantity = roller.roll_stackable(element.item);

		if (element.id in distinct) {
			distinct[element.id].quantity += quantity;
		} else {
			distinct[element.id] = new ItemObj(element.id, element.item, quantity, null);
		}
	});

	// Transform dictionary back into an array
	// Handling duplicates is the only place we need dict structure
	var keys = Object.keys(distinct);
	var item_array = [];

	keys.forEach(element => {
		var item = distinct[element];
		item_array.push(item);
	})
	return item_array;
}