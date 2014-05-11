var duplexer = require('duplexer');
var through = require('through');

module.exports = function(counter) {
  var countriesCount = {};
  
  function write(obj) {
    countriesCount[obj.country] ? countriesCount[obj.country]++ : countriesCount[obj.country] = 1;
    this.queue(obj.country);
  }
  
  function end() {
    counter.setCounts(countriesCount);
  }
  
  return duplexer(through(write, end), counter);
}
