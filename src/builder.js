var pricer = require('./pricer');
var sanitiser = require('./sanitiser');
var formatter = require('./formatter');
var ItemObj = require('./item_obj');
var q = require('q');


module.exports = class Builder {
    
    /*
     * Process the DB rows into workable objects (item_obj)
     * Steps of the process
     * 1. Sanitise
     * 2. Price
     * 3. Format
     */ 
    processResults(db_rows) {

        var distinct_items = this.sanitiseResults(db_rows)
        this.priceResults(distinct_items);
        // var reward_result = [];
        // var promise_arr = [];

        // return q.all(reward_result);
    }

    /*
     * Fetch price of each item, and store value in item_obj structure
     */
    priceResults(distinct_items) {
        var keys = Object.keys(distinct_items);
        keys.forEach(function(key) {

            var item_obj = distinct_items[key];
            //var p = new Promise((resolve, reject) => {
            pricer(item_obj.id).then(function(result) {
                item_obj.price = result;
                console.log(item_obj);
                //resolve('done');
            })    
            //})
            // promise_arr.push(p);  
        })
    }

    /*
     * Create a set of items (Dupes removed and quantities handled accordingly)
     */
    sanitiseResults(input) {
        // Key: Item ID
        // Value: Obj
        var distinct = {};

        input.forEach(element => {

            var quantity = 1;

            if (element.stackable == 1)
                quantity = this.roll_stackable(element.item);

            if (element.id in distinct) {
                distinct[element.id].quantity += quantity;
            } else {
                distinct[element.id] = new ItemObj(element.id, element.item, quantity, null);
            }
        });
        return distinct;
    }

    formatResults() {

    }

    /*
     * Arbitrary values, since I'm not sure how they roll stackable quantities
     * This method should be in roller? If so, it might be a bit tricky to have it that way.
     */
    roll_stackable(item_name) {
		if (item_name == "Coins") {
            return 2000 + Math.floor(Math.random() * 6666);
        } else {
            return 5 + Math.floor(Math.random() * 47);
        }
	}
}