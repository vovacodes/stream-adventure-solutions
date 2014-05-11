var split = require('split');
var through = require('through');

var lineNumber = 0;

process.stdin
    .pipe(split())
    .pipe(through(function onLineRecieved(line) {
      var isEven = ! (++lineNumber % 2);
      if (isEven) {
        this.queue(line.toString().toUpperCase());
      } else {
        this.queue(line.toString().toLowerCase());
      }
      this.queue('\n');
    }))
    .pipe(process.stdout);