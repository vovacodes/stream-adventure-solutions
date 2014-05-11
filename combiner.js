var zlib = require('zlib');
var util = require('util');

var combine = require('stream-combiner');
var split = require('split');
var through = require('through');

module.exports = function() {
  var genreObject;
  
  return combine(split(),
      through(function write(line) {
        if (!line) return;
        var obj = JSON.parse(line);
        if (obj.type == 'genre') {
                     
          // if we have genreObject filled in, emit the 'data' event with it 
          if (genreObject) this.emit('data', JSON.stringify(genreObject) + '\n');
                     
            // create new genreObject and start filling it in;
            genreObject = {};
            genreObject.name = obj.name;
        } else if (obj.type == 'book') {
          if (!(genreObject && genreObject.name)) {
            this.emit('error', new Error('Book object received before the Genre.'));
          }
          genreObject.books = (genreObject.books || []);
          genreObject.books.push(obj.name);
        } else {
          this.emit('error', new Error('Unexpected object received: ' + util.inspect(obj)))
        }
      }, function end() {
        if (genreObject) {
          this.queue(JSON.stringify(genreObject) + '\n');
        }
        this.queue(null);
      }),
      zlib.createGzip());
}
