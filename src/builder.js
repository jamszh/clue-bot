const pricer = require('./build_procs/pricer');
const sanitiser = require('./build_procs/sanitiser');
const formatter = require('./build_procs/formatter');

/*
 * Process the DB rows into workable objects (item_obj)
 * Steps of the process
 * 1. Sanitise
 * 2. Price
 * 3. Format
 */ 
module.exports = class Builder {

    processResults(db_rows, roller) {
        var promise_arr = [];
        var distinct_items = this.sanitiseResults(db_rows, roller);

        return new Promise((resolve, reject) => {
            try {
                this.priceResults(distinct_items).then((result) => {
                    const formatted_output = this.formatResults(distinct_items);
                    resolve(formatted_output);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    /*
     * Fetch price of each item and then process reward valuation
     * Store value in item_obj structure
     */
    priceResults(distinct_items) {
        var promise_arr = [];

        distinct_items.forEach(function(item_obj) {

            // Coins are by definition the value of measure, no need to price
            if (item_obj.id == 617) {
                item_obj.price = item_obj.quantity;
                return;
            }

            promise_arr.push(new Promise((resolve, reject) => {
                pricer(item_obj).then(function(result) {
                    item_obj.price = result;
                    resolve(result);
                })    
            }));
        })
        return Promise.all(promise_arr);
    }

    /*
     * View sanitiser.js
     */
    sanitiseResults(input, roller) {
        return sanitiser(input, roller);
    }

    /*
     * View formatter.js
     */
    formatResults(input) {
        return formatter(input);
    }
}