const pricer = require('./build_procs/pricer');
const sanitiser = require('./build_procs/sanitiser');
const formatter = require('./build_procs/formatter');

module.exports = class Builder {

  processResults(db_rows, roller) {
    /**
     * Process the DB rows into workable objects (item_obj)
     * Steps of the process
     * 1. Sanitise
     * 2. Price
     * 3. Format
     * @param db_rows results from DB
     * @param roller
     */
    var distinct_items = this.sanitiseResults(db_rows, roller);

    return new Promise((resolve, reject) => {
      this.priceResults(distinct_items).then((result) => {
        if (!result) { reject(error); }
        const formatted_output = this.formatResults(distinct_items);
        resolve(formatted_output);
      })
    });
  }

  priceResults(distinct_items) {
    /**
     * Fetch price of each item and then process reward valuation
     * Store value in item_obj structure
     * @param object distinct_items
     * @return array of promises
     */
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
        }).catch(error => reject(error));
      }));
    })
    return Promise.all(promise_arr);
  }

  sanitiseResults(input, roller) {
      return sanitiser(input, roller);
  }

  formatResults(input) {
      return formatter(input);
  }
}