const request = require("request");

/*
 * Price fetching off osrs GE API (Async)
 * API base URL:
 * http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=
 */
module.exports = async (item) => {
  var item_ID = item.id;
  var url = "http://services.runescape.com/m=itemdb_oldschool/api"
            + "/catalogue/detail.json?item=" + item_ID;

  return new Promise((resolve, reject) => {
      request.get(url, (err, response, body) => {
        console.log("GE API response: " + response);
        if (err) { reject(err); }

        const json = JSON.parse(body);
        var value = json.item.current.price;
        if (typeof value === 'string' || value instanceof String) {
          value = convert_to_dec(value);
        }
        // Calculate item valuation
        value = value * item.quantity;
        resolve(value);
      });
  });
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