var pricer = require('./pricer');
var q = require('q');

// Sanitise the reward list (Deduplication)
// Process (Fetcher)
module.exports = function(list){


	var total_value = 0;

	// Holds a unique array stack for the item rewards
	var cleaned = [];
	var organised = [];

	// Remove Dupes and sum the freq
	list.forEach(function(a){
		if(!this[a.item]){
			this[a.item] = { item: a.item, freq: 0, id: a.id};
			cleaned.push(this[a.item]);
		}
		this[a.item].freq += a.freq;
	}, Object.create(null));

	// Organising
	cleaned.forEach(function(obj){
		if(obj.item !== 'Coins'){
			var element = pricer(obj.id).then(function(result){
				var element = {
					item: obj.item,
					freq: obj.freq,
					price: result
				}
				return element;
			});
			organised.push(element);
		}else{
			organised.push({
				item: obj.item,
				freq:obj.freq,
				price: 1
			})
		}
	});

	return q.all(organised);
}