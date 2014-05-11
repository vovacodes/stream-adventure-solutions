var concat = require('concat-stream');

process.stdin.pipe(concat(function (buf) {
  process.stdout.write(Array.prototype.reverse.call(buf));
}));
